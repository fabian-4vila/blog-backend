import { Repository } from 'typeorm';
import { User } from '../../../entities/User.entity';
import UserService from '../../user/services/user.service';
import { RoleType } from '../../../types/Role.type';

class RegisterService {
  private userRepository: Repository<User>;

  constructor(userService: UserService) {
    this.userRepository = userService.getRepository();
  }
  public async registerUser(userData: Partial<User>) {
    const newUser = this.userRepository.create({
      ...userData,
      role: RoleType.SUBSCRIBED,
    });
    return this.userRepository.save(newUser);
  }
}
export default RegisterService;
