import App from './app';
import BaseRoute from './routes/base.routes';
import UserRoute from './routes/user.routes';
import PostRoute from './routes/post.routes';
import CommentRoute from './routes/comment.routes';
import PostRatingRoute from './routes/postRating.routes';
import CommentRatingRoute from './routes/commentRating.routes';
import RegisterRoute from './routes/register.routes';
import AuthRoute from './routes/auth.routes';
import VerificationRoute from './routes/verify.routes';

const app = new App([
  new BaseRoute(),
  new UserRoute(),
  new PostRoute(),
  new CommentRoute(),
  new PostRatingRoute(),
  new CommentRatingRoute(),
  new RegisterRoute(),
  new AuthRoute(),
  new VerificationRoute(),
]);

app.listen();
