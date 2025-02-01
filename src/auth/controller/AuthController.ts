import { Request, Response } from 'express';
import { AuthService } from '../service/auth.service';

class AuthController {
  private authService: AuthService;

  constructor(authService: AuthService) {
    this.authService = authService;
  }
  //  Resgister
  public async register(req: Request, res: Response): Promise<void> {
    try {
      const { name, email, password } = req.body;
      const user = await this.authService.register(name, email, password);
      res.status(201).json({ message: 'User registered successfully', user });
    } catch (error) {
      res.status(500).json({ message: 'Internal Server Error' });
    }
  }
  // Login
  public async login(req: Request, res: Response): Promise<void> {
    try {
      const { email, password } = req.body;
      const token = await this.authService.login(email, password);
      res.status(200).json({ token });
    } catch (error) {
      if (error instanceof Error && error.message === 'Invalid credentials') {
        res.status(401).json({ message: 'Invalid credentials' });
      }
      res.status(500).json({ message: 'Internal Server Error' });
    }
  }
}
export default new AuthController(new AuthService());
