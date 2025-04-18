import { config } from 'dotenv';
import { DataSource, DataSourceOptions } from 'typeorm';
import { join } from 'path';
import { SnakeNamingStrategy } from 'typeorm-naming-strategies';
import { User } from '../entities/User.entity';
import { Post } from '../entities/Post.entity';
import { Comment } from '../entities/Comment.entity';
import { PostRating } from '../entities/PostRating.entity';
import { CommentRating } from '../entities/CommentRating.entity';

config({ path: `.env.${process.env.NODE_ENV || 'development'}.local` });
export const { PORT, DB_HOST, DB_PORT, DB_NAME, DB_USER, DB_PASSWORD } = process.env;

const configDBConnection: DataSourceOptions = {
  type: 'postgres',
  host: DB_HOST,
  port: Number(DB_PORT),
  username: DB_USER,
  password: DB_PASSWORD,
  database: DB_NAME,
  synchronize: false,
  migrationsRun: false,
  logging: false,
  entities: [User, Post, Comment, PostRating, CommentRating],
  migrations: [join(__dirname, '../migrations/*{.ts,.js}')],
  subscribers: [join(__dirname, '../**/*.subscriber{.ts,.js}')],
  namingStrategy: new SnakeNamingStrategy(),
  extra: {
    ssl: {
      rejectUnauthorized: false,
    },
  },
};
export const AppDataSource: DataSource = new DataSource(configDBConnection);
