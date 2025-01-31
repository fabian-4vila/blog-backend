import { Request, Response } from 'express';
import { AuthService } from '../service/auth.service';

class AuthController {
  private authService: AuthService;

  constructor(authService: AuthService) {
    this.authService = authService;
  }

  // Login
  public async login(req: Request, res: Response) {
    try {
      const { email, password } = req.body;
      const token = await this.authService.login(email, password);
      return res.status(200).json({ token });
    } catch (error) {
      if (error instanceof Error && error.message === 'Invalid credentials') {
        return res.status(401).json({ message: 'Invalid credentials' });
      }
      return res.status(500).json({ message: 'Internal Server Error' });
    }
  }
}
export default new AuthController(new AuthService());
