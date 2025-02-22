import { DeleteResult, Repository, UpdateResult } from 'typeorm';
import { User } from '../../../entities/User.entity';
import { AppDataSource } from '../../../config/data.source';
import { logger } from '../../../utils/logger';
import { CreateUserDto } from '../../../dtos/CreateUserDto';
import { RoleType } from '../../../types/Role.type';
import bcrypt from 'bcrypt';
import { UpdateUserDto } from '../../../dtos/UpdateUserDto';

class UserService {
  private userRepository: Repository<User>;
  constructor() {
    this.userRepository = AppDataSource.getRepository(User);
  }

  /**
   * Get All User
   */
  public async getAllUser(): Promise<User[]> {
    logger.info(`${UserService.name}-getAllUser`);
    return this.userRepository.find();
  }

  /**
   * Get User By Id
   */
  public async getUserById(id: string): Promise<User | null> {
    logger.info(`${UserService.name}-getUserById with id: ${id}`);
    return this.userRepository.findOne({ where: { id } });
  }

  /**
   * Get User By Email
   */
  public async getUserByEmail(email: string): Promise<User | null> {
    logger.info(`${UserService.name} - getUserByEmail with email: ${email}`);
    return this.userRepository.findOne({ where: { email } });
  }

  /**
   * Get User By Role And Id
   */
  public async getUsersByRoleAndId(role?: RoleType, id?: string): Promise<User[] | User | null> {
    logger.info(`${UserService.name} - getUsersByRoleAndId with role: ${role}, id: ${id}`);
    if (role && id) {
      return this.userRepository.findOne({ where: { id, role } });
    }
    if (role) {
      return this.userRepository.find({ where: { role } });
    }
    if (id) {
      return this.getUserById(id);
    }
    return [];
  }

  /**
   * Create User
   */
  public async createUser(userBody: CreateUserDto): Promise<User> {
    logger.info(`${UserService.name} - createUser`);
    const newUser = this.userRepository.create({
      ...userBody,
      role: RoleType.ADMIN,
    });
    return this.userRepository.save(newUser);
  }
  /**
   * partial Update User By Id
   */
  public async partialUpdateUserById(id: string, partialUpdateUserBody: Partial<UpdateUserDto>) {
    const user = await this.getUserById(id);
    if (!user) throw new Error(`User with ID ${id} not found`);

    const updatedData = { ...partialUpdateUserBody };
    if (updatedData.password) {
      updatedData.password = await bcrypt.hash(updatedData.password, 10);
    }

    await this.userRepository.update(id, updatedData);
    return this.getUserById(id);
  }

  /**
   * Update User By Id
   */
  public async updateUserById(id: string, UpdatUserBody: UpdateUserDto): Promise<UpdateResult> {
    logger.info(`${UserService.name} - updateUserById with id: ${id}`);
    const user = await this.getUserById(id);
    if (!user) throw new Error(`User with ID ${id} not found`);
    const updatedData = { ...UpdatUserBody };
    if (updatedData.password) {
      updatedData.password = await bcrypt.hash(updatedData.password, 10);
    }
    return this.userRepository.update(id, updatedData);
  }

  /**
   * Delete User By Id
   */
  public async deleteUserById(id: string): Promise<DeleteResult> {
    logger.info(`${UserService.name}-DeleteUserById with id: ${id}`);
    const userToDeleted = await this.getUserById(id);
    if (!userToDeleted) throw new Error('user does not exist');
    await this.userRepository.delete(id);
    return this.userRepository.delete(id);
  }
  // revisar el delete agregue promesa pero no se si esta bien lo que retorna
  public getRepository(): Repository<User> {
    return this.userRepository;
  }
}

export default UserService;
