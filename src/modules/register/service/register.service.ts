import { Repository } from 'typeorm';
import { User } from '../../../entities/User.entity';
import UserService from '../../user/services/user.service';
import { RoleType } from '../../../types/Role.type';

class RegisterService {
  private userRepository: Repository<User>;

  constructor(private readonly userService: UserService) {
    this.userRepository = userService.getRepository();
  }
  public async registerUser(userData: Partial<User>): Promise<User> {
    if (!userData.email) {
      throw new Error('Email is required to register a user');
    }
    const existingUser = await this.userService.getUserByEmail(userData.email);
    if (existingUser) {
      throw new Error(`User with email ${userData.email} already exists`);
    }
    const newUser = this.userRepository.create({
      ...userData,
      role: RoleType.SUBSCRIBED,
    });
    return this.userRepository.save(newUser);
  }
}
export default RegisterService;
