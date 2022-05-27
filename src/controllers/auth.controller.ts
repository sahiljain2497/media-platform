import { NextFunction, Request, Response } from 'express';
import { CreateUserDto } from '@dtos/users.dto';
import { AuthRequestI, LoginRes } from '@interfaces/auth.interface';
import { UserI } from '@/interfaces/models/user.interface';
import AuthService from '@services/auth.service';

class AuthController {
  public authService = new AuthService();

  public signUp = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const userData: CreateUserDto = req.body;
      const loginRes: LoginRes = await this.authService.signup(userData);
      res.status(201).json({ data: { ...loginRes }, message: 'signup' });
    } catch (error) {
      next(error);
    }
  };

  public logIn = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const userData: CreateUserDto = req.body;
      const loginRes: LoginRes = await this.authService.login(userData);
      res.status(200).json({ data: { ...loginRes }, message: 'login' });
    } catch (error) {
      next(error);
    }
  };

  public logOut = async (req: AuthRequestI, res: Response, next: NextFunction) => {
    try {
      const userData: UserI = req.user;
      const logOutUserData: UserI = await this.authService.logout(userData);

      res.setHeader('Set-Cookie', ['Authorization=; Max-age=0']);
      res.status(200).json({ data: logOutUserData, message: 'logout' });
    } catch (error) {
      next(error);
    }
  };
  public forgotPassword = async (req: Request, res: Response, next: NextFunction) => {
    try {
      await this.authService.forgotPassword(req.body.email);
      res.send({ message: 'Please check your email to reset your password' });
    } catch (error) {
      next(error);
    }
  };

  public resetPassword = async (req: Request, res: Response, next: NextFunction) => {
    try {
      await this.authService.resetPassword(req.body.token, req.body.password);
      res.send({ message: 'Password reset successful!' });
    } catch (error) {
      next(error);
    }
  };

  public changePassword = async (req: AuthRequestI, res: Response, next: NextFunction) => {
    try {
      const user = await this.authService.changePassword(req.user, req.body.password);
      res.send({ message: 'Password changed successful!', data: { user } });
    } catch (error) {
      next(error);
    }
  };
}

export default AuthController;
