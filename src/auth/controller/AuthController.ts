import { Request, Response } from 'express';
import { logger } from '../../utils/logger';
import AuthService from '../service/auth.service';

class AuthController {
  private readonly authService: AuthService = new AuthService();

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  constructor() {}

  /**
   * Login user
   */
  public login = async (req: Request, res: Response) => {
    try {
      const { email, password } = req.body;
      logger.info(`${AuthController.name}-login: ${email}`);
      const result = await this.authService.login(email, password);
      if (!result) {
        res.status(401).json({
          ok: false,
          message: 'Credenciales inválidas',
        });
        return;
      }
      const { accessToken, refreshToken, user } = result;
      res.status(200).json({
        ok: true,
        accessToken,
        refreshToken,
        user,
        message: 'Login exitoso',
      });
    } catch (error) {
      logger.error(`${AuthController.name}- Error en login: ${error}`);
      res.status(500).json({ ok: false, message: 'Error en el inicio de sesión' });
    }
  };

  /**
   * Register user
   */
  public register = async (req: Request, res: Response) => {
    try {
      const userBody = req.body;
      logger.info(`${AuthController.name}-register`);
      const newUser = await this.authService.register(userBody);

      res.status(201).json({
        ok: true,
        user: newUser,
        message: 'Usuario registrado exitosamente',
      });
    } catch (error) {
      logger.error(`${AuthController.name}- Error en register: ${error}`);
      res.status(500).json({ ok: false, message: 'Error registrando usuario' });
    }
  };

  /**
   * Refresh token
   */
  public refreshToken = async (req: Request, res: Response) => {
    try {
      const { refreshToken } = req.body;
      logger.info(`${AuthController.name}-refreshToken`);
      const newToken = await this.authService.refreshToken(refreshToken);

      if (!newToken) {
        res.status(401).json({ ok: false, message: 'Refresh token inválido' });
        return;
      }

      res.status(200).json({ ok: true, accessToken: newToken, message: 'Token renovado' });
    } catch (error) {
      logger.error(`${AuthController.name}- Error en refreshToken: ${error}`);
      res.status(500).json({ ok: false, message: 'Error renovando token' });
    }
  };
}

export default AuthController;
