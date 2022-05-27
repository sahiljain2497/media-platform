import { Router } from 'express';
import AuthController from '@controllers/auth.controller';
import { CreateUserDto } from '@dtos/users.dto';
import { RoutesI } from '@interfaces/routes.interface';
import authMiddleware from '@/middlewares/user.middleware';
import validationMiddleware from '@middlewares/validation.middleware';

class AuthRoute implements RoutesI {
  public path = '/';
  public router = Router();
  public authController = new AuthController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.post(`${this.path}signup`, validationMiddleware(CreateUserDto, 'body'), this.authController.signUp);
    this.router.post(`${this.path}login`, this.authController.logIn);
    this.router.post(`${this.path}forgot-password`, this.authController.forgotPassword);
    this.router.post(`${this.path}reset-password`, this.authController.resetPassword);
    this.router.post(`${this.path}change-password`, authMiddleware, this.authController.changePassword);
    // this.router.post(`${this.path}logout`, authMiddleware, this.authController.logOut);
  }
}

export default AuthRoute;
