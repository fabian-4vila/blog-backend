import App from './app';
import BaseRoute from './routes/base.routes';
import UserRoute from './routes/user.routes';
import PostRoute from './routes/post.routes';
import CommentRoute from './routes/comment.routes';
const app = new App([new BaseRoute(), new UserRoute(), new PostRoute(), new CommentRoute()]);

app.listen();
