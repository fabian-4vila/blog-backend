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
      return this.httpResponse.Ok(res, { token });
    } catch (error) {
      return this.httpResponse.Error(res, 'Error server side');
    }
  }
}

export default AuthController;
