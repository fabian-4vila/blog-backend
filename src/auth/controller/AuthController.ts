import { Request, Response } from 'express';
import { AuthService } from '../service/auth.service';
import { LoginDto } from '../../dtos/login.dto';
import { validate } from 'class-validator';

class AuthController {
  private authService: AuthService;

  constructor() {
    this.authService = new AuthService();
  }

  // Login
  public async login(req: Request, res: Response) {
    try {
      const loginDto = Object.assign(new LoginDto(), req.body);
      const errors = await validate(loginDto);

      if (errors.length > 0) {
        return res.status(400).json({ errors });
      }

      const token = await this.authService.login(loginDto.email, loginDto.password);
      return res.status(200).json({ token });
    } catch (error) {
      return res.status(401).json({ message: 'Credenciales incorrectas' });
    }
  }
}

export default new AuthController();
