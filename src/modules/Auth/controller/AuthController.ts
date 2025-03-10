import { Request, Response } from 'express';
import { authenticateUser, generateToken } from '../service/Auth.service';
import { HttpResponse } from '../../../shared/http.response';

class AuthController {
  constructor(private readonly httpResponse: HttpResponse = new HttpResponse()) {}

  public async login(req: Request, res: Response): Promise<Response> {
    try {
      const { email, password } = req.body;
      const user = await authenticateUser(email, password);

      if (!user) {
        return this.httpResponse.Unauthorized(res, 'Invalid credentials');
      }

      const token = generateToken(user);

      res.cookie('auth_token', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
        maxAge: 60 * 60 * 1000, // 1 hora
      });

      return this.httpResponse.Ok(res, { message: 'Login successful' });
    } catch (error) {
      return this.httpResponse.Error(res, 'Server error');
    }
  }

  public async logout(_req: Request, res: Response): Promise<Response> {
    res.clearCookie('auth_token');
    return this.httpResponse.Ok(res, { message: 'Logout successful' });
  }
}

export default AuthController;
