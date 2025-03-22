import { Repository } from 'typeorm';
import { User } from '../../../entities/User.entity';
import { AppDataSource } from '../../../config/data.source';
import { logger } from '../../../utils/logger';
import jwt from 'jsonwebtoken';
import { sendVerificationEmail } from '../../../utils/email';
import { HttpException } from '../../../exceptions/httpException';

class VerificationService {
  private userRepository: Repository<User>;

  constructor() {
    this.userRepository = AppDataSource.getRepository(User);
  }

  /**
   * Send Verification Email
   */
  public async sendVerificationEmail(email: string): Promise<void> {
    logger.info(`${VerificationService.name} - sendVerificationEmail to: ${email}`);

    const user = await this.userRepository.findOne({ where: { email } });
    if (!user) {
      throw new HttpException(404, 'User not found');
    }
    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET as string, {
      expiresIn: '1h',
    });
    await sendVerificationEmail(email, token);
  }
  public async verifyEmailToken(token: string): Promise<User | null> {
    try {
      logger.info(`${VerificationService.name} - verifyEmailToken`);
      const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as { id: string };
      const user = await this.userRepository.findOne({ where: { id: decoded.id } });
      if (!user) return null;
      user.verified = true;
      await this.userRepository.save(user);
      return user;
    } catch (error) {
      logger.error(`${VerificationService.name} - Invalid or expired token`);
      return null;
    }
  }
}

export default VerificationService;
