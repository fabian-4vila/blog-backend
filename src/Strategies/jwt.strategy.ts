import passport from 'passport';
import { ExtractJwt, Strategy as JwtStrategy } from 'passport-jwt';
import { User } from '../entities/User.entity';
import { AppDataSource } from '../config/data.source';
import { AuthenticatedUser } from '../interfaces/AuthUser';

const JWT_SECRET = process.env.JWT_SECRET;

if (!JWT_SECRET) {
  throw new Error('FATAL ERROR: JWT_SECRET no está definido en las variables de entorno.');
}

const options = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: JWT_SECRET,
};

passport.use(
  new JwtStrategy(options, async (payload, done) => {
    try {
      // Asegurar que AppDataSource esté inicializado
      if (!AppDataSource.isInitialized) {
        await AppDataSource.initialize();
      }

      const userRepository = AppDataSource.getRepository(User);
      const user = await userRepository.findOne({ where: { id: payload.sub } });

      if (!user) return done(null, false);

      // Retornar solo los datos necesarios como un AuthenticatedUser
      const authenticatedUser: AuthenticatedUser = {
        id: user.id,
        role: user.role,
        permissions: user.permissions || [],
      };

      return done(null, authenticatedUser);
    } catch (error) {
      return done(error, false);
    }
  }),
);

export default passport;
