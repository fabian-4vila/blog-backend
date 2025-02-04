import { Repository } from 'typeorm';
import { User } from '../../entities/User.entity';
import { AppDataSource } from '../../config/data.source';
import { logger } from '../../utils/logger';
import { CreateUserDto } from '../../dtos/CreateUserDto';
import { RoleType } from '../../types/Role.type';

class UserService {
  private userRepository: Repository<User>;
  constructor() {
    this.userRepository = AppDataSource.getRepository(User);
  }

  /**
   * getAllUser
   */
  public async getAllUser(): Promise<User[]> {
    logger.info(`${UserService.name}-getAllUser`);
    return this.userRepository.find({ relations: ['post', 'comment', 'post_rating', 'comment_rating'] });
  }
  /**
   * getUserById
   */
  public async getUserById(id: string): Promise<User | null> {
    logger.info(`${UserService.name}-getUserById with id: ${id}`);
    return this.userRepository.findOne({ where: { id } });
  }
  /**
   * getUserByEmail
   */
  public async getUserByEmail(email: string): Promise<User | null> {
    logger.info(`${UserService.name} - getUserByEmail with email: ${email}`);
    return this.userRepository.findOne({ where: { email } });
  }
  /**
   * getUserByRoleAndId
   */
  public async getUsersByRoleAndId(role?: RoleType, id?: string): Promise<User[] | User | null> {
    logger.info(`${UserService.name} - getUsersByRoleAndId with role: ${role}, id: ${id}`);

    if (role && id) {
      // Buscar usuario específico con ID y rol
      return this.userRepository.findOne({ where: { id, role } });
    } else if (role) {
      // Buscar todos los usuarios con un rol específico
      return this.userRepository.find({ where: { role } });
    } else if (id) {
      // Buscar solo por ID
      return this.getUserById(id);
    }

    // Si no se pasan parámetros, devolver lista vacía
    return [];
  }
  /**
   * createUser
   */
  public async createUser(userBody: CreateUserDto): Promise<User> {
    logger.info(`${UserService.name} - createUser`);
    const newUser = this.userRepository.create(userBody);
    return this.userRepository.save(newUser);
  }
  /**
   * UpdateUserById
   */
  public async updateUserById(id: string, UpdatUserBody: Partial<CreateUserDto>) {
    logger.info(`${UserService.name} - updateUserById with id: ${id}`);
    const user = await this.getUserById(id);
    if (!user) return null;
    await this.userRepository.update(id, UpdatUserBody);
    return this.getUserById(id);
  }
  /**
   * deleteUserById
   */
  public async deleteUserById(id: string) {
    logger.info(`${UserService.name}-DeleteUserById with id: ${id}`);
    const userToDeleted = await this.getUserById(id);
    if (!userToDeleted) return null;
    await this.userRepository.delete(id);
    return userToDeleted;
  }
}

export default UserService;
