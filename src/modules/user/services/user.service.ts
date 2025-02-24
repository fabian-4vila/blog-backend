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
    return await this.userRepository.find();
  }

  /**
   * Get User By Id
   */
  public async getUserById(id: string): Promise<User> {
    logger.info(`${UserService.name}-getUserById with id: ${id}`);
    const user = await this.userRepository.findOne({ where: { id } });
    if (!user) {
      throw new Error('User not found');
    }
    return user;
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
    return await this.userRepository.save(newUser);
  }

  /**
   * partial Update User By Id
   */
  public async partialUpdateUserById(id: string, partialUpdateUserBody: Partial<UpdateUserDto>): Promise<UpdateResult> {
    const user = await this.getUserById(id);
    if (!user) throw new Error(`User with ID ${id} not found`);
    if (Object.keys(partialUpdateUserBody).length === 0) {
      throw new Error('No data provided for update');
    }
    const updatedData = { ...partialUpdateUserBody };
    if (updatedData.password) {
      updatedData.password = await bcrypt.hash(updatedData.password, 10);
    }
    return await this.userRepository.update(id, updatedData);
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
    return await this.userRepository.update(id, updatedData);
  }

  /**
   * Delete User By Id
   */
  public async deleteUserById(id: string): Promise<DeleteResult> {
    logger.info(`${UserService.name}-DeleteUserById with id: ${id}`);
    const userToDeleted = await this.getUserById(id);
    if (!userToDeleted) throw new Error('user does not exist');
    return await this.userRepository.delete(id);
  }

  public getRepository(): Repository<User> {
    return this.userRepository;
  }
}

export default UserService;
