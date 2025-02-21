import { Repository } from 'typeorm';
import { User } from '../../../entities/User.entity';
import { AppDataSource } from '../../../config/data.source';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { logger } from '../../../utils/logger';

class PasswordResetService {
  private userRepository: Repository<User>;

  constructor() {
    this.userRepository = AppDataSource.getRepository(User);
  }

  /**
   * GenerateResetToken
   */
  public async generateResetToken(email: string): Promise<string | null> {
    const user = await this.userRepository.findOne({ where: { email } });
    if (!user) return null;

    const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET as string, {
      expiresIn: '1h',
    });
    return token;
  }

  /**
   * ResetPassword
   */
  public async resetPassword(token: string, newPassword: string): Promise<boolean> {
    try {
      const decoded: any = jwt.verify(token, process.env.JWT_SECRET as string);
      const user = await this.userRepository.findOne({ where: { id: decoded.userId } });
      if (!user) return false;
      const hashedPassword = await bcrypt.hash(newPassword, 10);
      user.password = hashedPassword;
      await this.userRepository.save(user);
      return true;
    } catch (error) {
      logger.error(`${PasswordResetService.name} - Error en resetPassword: ${error}`);
      return false;
    }
  }
}

export default PasswordResetService;
