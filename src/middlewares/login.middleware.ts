import { Request, Response, NextFunction } from 'express';
import { validate } from 'class-validator';
import { LoginDto } from '../dtos/login.dto';

export async function validateLogin(req: Request, res: Response, next: NextFunction): Promise<void> {
  console.log('📝 Datos recibidos en login:', req.body); // Log para depuración

  const loginDto = Object.assign(new LoginDto(), req.body);
  const errors = await validate(loginDto);

  if (errors.length > 0) {
    console.log('❌ Errores en la validación de login:', errors); // Log para ver los errores

    const formattedErrors = errors.map((err) => ({
      property: err.property,
      constraints: Object.values(err.constraints || {}),
    }));

    res.status(400).json({
      ok: false,
      message: 'Error en los datos de inicio de sesión',
      errors: formattedErrors,
    });
    return;
  }

  return next();
}
