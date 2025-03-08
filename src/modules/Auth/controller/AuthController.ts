import { Request, Response } from 'express';
import { authenticateUser } from '../service/Auth.service';
import { HttpResponse } from '../../../shared/http.response';

class AuthController {
  constructor(private readonly httpResponse: HttpResponse = new HttpResponse()) {}

  public async login(req: Request, res: Response): Promise<Response> {
    try {
      const { email, password } = req.body;
      const token = await authenticateUser(email, password);

      if (!token) {
        return this.httpResponse.Unauthorized(res, 'Invalid credentials');
      }

      res.cookie('auth_token', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
        maxAge: 60 * 60 * 1000,
      });

      return this.httpResponse.Ok(res, { message: 'Login successful' });
    } catch (error) {
      return this.httpResponse.Error(res, 'Error server side');
    }
  }

  public async logout(_req: Request, res: Response): Promise<Response> {
    res.clearCookie('auth_token');
    return this.httpResponse.Ok(res, { message: 'Logout successful' });
  }
}

export default AuthController;
