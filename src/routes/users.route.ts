import { Router } from 'express';
import UsersController from '@controllers/users.controller';
import { RoutesI } from '@interfaces/routes.interface';
import validationMiddleware from '@middlewares/validation.middleware';
import authMiddleware from '@/middlewares/user.middleware';

class UsersRoute implements RoutesI {
  public path = '/users';
  public router = Router();
  public usersController = new UsersController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    // channels
    this.router.get(`${this.path}/channels`, authMiddleware, this.usersController.getUserById);
    this.router.post(`${this.path}/channels/:channelId`, authMiddleware, this.usersController.getUserById);
    this.router.delete(`${this.path}/channels/:channelId`, authMiddleware, this.usersController.getUserById);
    // posts
    this.router.get(`${this.path}/posts`, authMiddleware, this.usersController.getUserById);
    this.router.post(`${this.path}/posts/:postId`, authMiddleware, this.usersController.getUserById);
    this.router.delete(`${this.path}/posts/:postId`, authMiddleware, this.usersController.deleteUser);
  }
}

export default UsersRoute;
