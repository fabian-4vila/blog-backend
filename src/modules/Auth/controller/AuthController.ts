import { Request, Response } from 'express';
import { authenticateUser } from '../service/Auth.service';

class AuthController {
  public async login(req: Request, res: Response): Promise<Response> {
    try {
      const { email, password } = req.body;
      const token = await authenticateUser(email, password);
      return res.json({ token });
    } catch (error) {
      return res.status(401).json({
        ok: false,
        message: 'Invalid credentials',
      });
    }
  }
}

export default AuthController;
