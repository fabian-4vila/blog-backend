import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { User } from '../../entities/User.entity';
import { UserPayLoadToken } from '../../interfaces/payLoad.interface';
import UserService from '../../user/services/user.service';
import { isValidPassword } from '../../utils/hash';
import { RoleType } from '../../types/Role.type';

export class AuthService {
  private userService: UserService;
  private jwtInstance: typeof jwt;
  private JWT_SECRET: string;

  constructor() {
    this.userService = new UserService();
    this.jwtInstance = jwt;
    this.JWT_SECRET = process.env.JWT_SECRET!;
  }

  public async register(
    name: string,
    email: string,
    password: string,
  ): Promise<{ message: string; user: Partial<User> }> {
    // Verificar si el usuario ya existe
    const existingUser = await this.userService.getUserByEmail(email);
    if (existingUser) {
      throw new Error('El usuario ya existe.');
    }

    // Hashear la contraseña antes de guardarla
    const hashedPassword = await bcrypt.hash(password, 10);

    // Crear usuario
    const newUser = await this.userService.createUser({
      name,
      email,
      password: hashedPassword,
      role: RoleType.SUBSCRIBED,
    });

    // Ocultar la contraseña en la respuesta
    const { password: _, ...userWithoutPassword } = newUser;

    return {
      message: 'Usuario registrado exitosamente.',
      user: userWithoutPassword,
    };
  }

  public async login(email: string, password: string): Promise<{ accessToken: string; user: Partial<User> | null }> {
    const user = await this.validateUser(email, password);

    if (!user) {
      throw new Error('Credenciales incorrectas');
    }

    return this.generateJwt(user);
  }

  /**
   * Valida usuario por email y contraseña
   */
  public async validateUser(email: string, password: string): Promise<User | null> {
    const userByEmail = await this.userService.getUserByEmail(email);

    if (userByEmail && (await isValidPassword(password, userByEmail.password))) {
      return userByEmail;
    }
    return null;
  }

  /**
   * Firma el JWT con el payload
   */
  private signature(payload: UserPayLoadToken): string {
    return this.jwtInstance.sign(payload, this.JWT_SECRET, { expiresIn: '1h' });
  }

  /**
   * Genera un JWT para un usuario
   */
  public async generateJwt(user: User): Promise<{ accessToken: string; user: Partial<User> | null }> {
    const userCheck = await this.userService.getUsersByRoleAndId(user.role, user.id);

    if (!userCheck || Array.isArray(userCheck)) {
      return { accessToken: '', user: null }; // Si devuelve un array o null, el usuario no es válido
    }

    const payload: UserPayLoadToken = {
      sub: userCheck.id,
      role: userCheck.role,
    };

    // Ocultar contraseña antes de devolver el usuario
    const { password, ...userWithoutPassword } = userCheck;

    return {
      accessToken: this.signature(payload),
      user: userWithoutPassword,
    };
  }
}
