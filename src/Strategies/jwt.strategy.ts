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

const initializeStrategy = async () => {
  if (!AppDataSource.isInitialized) {
    try {
      await AppDataSource.initialize();
      console.log('📦 Conexión a la base de datos inicializada para JWT.');
    } catch (error) {
      console.error('❌ Error al inicializar la base de datos:', error);
      process.exit(1); // Detener la aplicación si la BD no se inicializa
    }
  }

  passport.use(
    new JwtStrategy(options, async (payload, done) => {
      try {
        const userRepository = AppDataSource.getRepository(User);
        const user = await userRepository.findOne({
          where: { id: payload.sub },
          select: ['id', 'role', 'permissions'], // Selecciona solo los datos necesarios
        });

        if (!user) return done(null, false);

        // Asegurar que `permissions` es un array válido
        const permissions = Array.isArray(user.permissions) ? user.permissions : [];

        const authenticatedUser: AuthenticatedUser = {
          id: user.id,
          role: user.role,
          permissions,
        };

        return done(null, authenticatedUser);
      } catch (error) {
        return done(error, false);
      }
    }),
  );
};

export { initializeStrategy };
