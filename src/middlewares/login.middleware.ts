import { Request, Response, NextFunction } from 'express';
import { validate } from 'class-validator';
import { LoginDto } from '../dtos/login.dto';

export async function validateLogin(req: Request, res: Response, next: NextFunction): Promise<void> {
  const loginDto = Object.assign(new LoginDto(), req.body);
  const errors = await validate(loginDto);
  if (errors.length > 0) {
    const formattedErrors = errors.map((err) => ({
      property: err.property,
      constraints: Object.values(err.constraints || {}),
    }));
    res.status(400).json({ errors: formattedErrors });
    return;
  }

  return next();
}
