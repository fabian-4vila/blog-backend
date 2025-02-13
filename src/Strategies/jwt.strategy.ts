import passport from 'passport';
import { ExtractJwt, Strategy as JwtStrategy } from 'passport-jwt';
import { User } from '../entities/User.entity';
import { AppDataSource } from '../config/data.source';
import { AuthenticatedUser } from '../interfaces/AuthUser';

const JWT_SECRET = process.env.JWT_SECRET;

if (!JWT_SECRET) {
  throw new Error('FATAL ERROR: Error in the server configuration.');
}

const options = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: JWT_SECRET,
};

const initializeStrategy = () => {
  passport.use(
    new JwtStrategy(options, async (payload, done) => {
      try {
        const userRepository = AppDataSource.getRepository(User);
        const user = await userRepository.findOne({
          where: { id: payload.sub },
          select: ['id', 'role', 'permissions'],
        });
        if (!user) return done(null, false);
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
