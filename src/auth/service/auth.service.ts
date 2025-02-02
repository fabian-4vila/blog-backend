import { Repository } from 'typeorm';
import { User } from '../../entities/User.entity';
import { AppDataSource } from '../../config/data.source';
import { logger } from '../../utils/logger';
import { CreateUserDto } from '../../dtos/CreateUserDto';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

class AuthService {
  private userRepository: Repository<User>;
  private readonly JWT_SECRET = process.env.JWT_SECRET!;
  private readonly JWT_EXPIRATION = '1h';
  private readonly REFRESH_SECRET = process.env.JWT_REFRESH_SECRET!;
  private readonly REFRESH_EXPIRATION = '7d';

  constructor() {
    this.userRepository = AppDataSource.getRepository(User);
  }

  /**
   * Login user
   */
  public async login(
    email: string,
    password: string,
  ): Promise<{ accessToken: string; refreshToken: string; user: Partial<User> } | null> {
    logger.info(`${AuthService.name}-login para el email: ${email}`);

    const user = await this.userRepository.findOne({ where: { email } });
    if (!user || !(await bcrypt.compare(password, user.password))) {
      return null;
    }

    const accessToken = this.generateToken(user.id, user.email);
    const refreshToken = this.generateRefreshToken(user.id);

    return {
      accessToken,
      refreshToken,
      user: { id: user.id, email: user.email },
    };
  }

  /**
   * Register user
   */
  public async register(userBody: CreateUserDto): Promise<User> {
    logger.info(`${AuthService.name}-register`);

    const hashedPassword = await bcrypt.hash(userBody.password, 10);
    const newUser = this.userRepository.create({ ...userBody, password: hashedPassword });
    return this.userRepository.save(newUser);
  }

  /**
   * Refresh token
   */
  public async refreshToken(token: string): Promise<string | null> {
    logger.info(`${AuthService.name}-refreshToken`);

    try {
      const decoded = jwt.verify(token, this.REFRESH_SECRET) as { id: string; email: string };
      return this.generateToken(decoded.id, decoded.email);
    } catch (error) {
      return null;
    }
  }

  /**
   * Generate JWT Token
   */
  private generateToken(userId: string, email: string): string {
    return jwt.sign({ id: userId, email }, this.JWT_SECRET, { expiresIn: this.JWT_EXPIRATION });
  }

  /**
   * Generate Refresh Token
   */
  private generateRefreshToken(userId: string): string {
    return jwt.sign({ id: userId }, this.REFRESH_SECRET, { expiresIn: this.REFRESH_EXPIRATION });
  }
}

export default AuthService;
