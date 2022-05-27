import { Router } from 'express';
import IndexController from '@controllers/index.controller';
import { RoutesI } from '@interfaces/routes.interface';
import userMiddleware from '@/middlewares/user.middleware';
import CommentController from '@/controllers/comment.controller';
import PostController from '@/controllers/post.controller';

class IndexRoute implements RoutesI {
  public path = '/';
  public router = Router();
  public indexController = new IndexController();
  public postController = new PostController();
  public commentController = new CommentController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(`${this.path}`, this.indexController.index);
    this.router.get(`${this.path}platforms`, this.indexController.platforms);
    this.router.get(`${this.path}categories`, this.indexController.categories);
    this.router.get(`${this.path}channels`, this.indexController.channels);
    this.router.get(`${this.path}authors`, this.indexController.authors);
    this.router.get(`${this.path}authors/:authorId`, this.indexController.authorDetails);
    this.router.get(`${this.path}posts`, this.postController.posts);
    this.router.get(`${this.path}posts/:postId`, this.postController.postDetails);
    // common comment routes
    this.router.get(`${this.path}comments`, this.commentController.getComments);
    this.router.post(`${this.path}comments`, userMiddleware, this.commentController.createComment);
    this.router.put(`${this.path}comments/:commentId`, userMiddleware, this.commentController.updateComment);
    this.router.delete(`${this.path}comments/:commentId`, userMiddleware, this.commentController.deleteComment);
  }
}

export default IndexRoute;
