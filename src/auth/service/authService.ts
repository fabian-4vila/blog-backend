import { AppDataSource } from '../../config/data.source';
import { User } from '../../entities/User.entity';
import { generateToken } from '../../utils/jwt.utils';
import { RoleType } from '../../types/Role.type';
import bcrypt from 'bcrypt';
import { UserPayLoad } from '../../interfaces/PayLoad.interface';

export class AuthService {
  private userRepository = AppDataSource.getRepository(User);

  async register(email: string, password: string, role: RoleType): Promise<User> {
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = this.userRepository.create({ email, password: hashedPassword, role });
    return this.userRepository.save(user);
  }

  async login(email: string, password: string): Promise<string | null> {
    const user = await this.userRepository.findOne({ where: { email } });

    if (!user || !(await bcrypt.compare(password, user.password))) {
      throw new Error('Credenciales incorrectas');
    }

    const userPayload: UserPayLoad = { id: user.id, role: user.role };
    return generateToken(userPayload);
  }
}
