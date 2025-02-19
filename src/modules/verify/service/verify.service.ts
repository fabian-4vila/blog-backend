import { Repository } from 'typeorm';
import { User } from '../../../entities/User.entity';
import UserService from '../../user/services/user.service';
import { RoleType } from '../../../types/Role.type';
import jwt from 'jsonwebtoken';
import { sendVerificationEmail } from '../../../utils/email';

class RegisterService {
  private userRepository: Repository<User>;

  constructor(userService: UserService) {
    this.userRepository = userService.getRepository();
  }

  public async registerUser(userData: Partial<User>) {
    const newUser = this.userRepository.create({
      ...userData,
      role: RoleType.SUBSCRIBED,
      verified: false, // Agregar el campo de verificación
    });

    const savedUser = await this.userRepository.save(newUser);

    // Generar token de verificación
    const token = jwt.sign(
      { id: savedUser.id },
      process.env.JWT_SECRET as string,
      { expiresIn: '1d' }, // Expira en 1 día
    );

    // Enviar correo de verificación
    await sendVerificationEmail(savedUser.email, token);

    return savedUser;
  }
}

export default RegisterService;
