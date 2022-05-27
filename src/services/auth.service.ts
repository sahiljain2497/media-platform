import { hash, compare } from 'bcrypt';
import { sign } from 'jsonwebtoken';
import { FRONTEND_RESET_PASSWORD_DOMAIN, SECRET_KEY } from '@config';
import { CreateUserDto } from '@dtos/users.dto';
import { HttpException } from '@exceptions/HttpException';
import { DataStoredInTokenI, TokenDataI } from '@interfaces/auth.interface';
import { UserI } from '@/interfaces/models/user.interface';
import UserModel from '@/models/user.model';
import { isEmpty } from '@utils/util';
import { randomBytes } from 'crypto';
import resetPasswordTokenModel from '@/models/resetPasswordToken.model';
import { forgotPassword } from '@/emails/mailer';

class AuthService {
  public users = UserModel;
  public resetPasswordToken = resetPasswordTokenModel;

  public async signup(userData: CreateUserDto): Promise<{ tokenData: TokenDataI; user: UserI }> {
    if (isEmpty(userData)) throw new HttpException(400, "You're not userData");

    const findUser: UserI = await this.users.findOne({ email: userData.email });
    if (findUser) throw new HttpException(409, `You're email ${userData.email} already exists`);

    const hashedPassword = await hash(userData.password, 10);
    const createUserData: UserI = await this.users.create({ ...userData, password: hashedPassword });
    const tokenData = this.createToken(createUserData);
    return { tokenData, user: createUserData };
  }

  public async login(userData: CreateUserDto): Promise<{ tokenData: TokenDataI; user: UserI }> {
    if (isEmpty(userData)) throw new HttpException(400, "You're not userData");

    const findUser: UserI = await this.users.findOne({ email: userData.email });
    if (!findUser) throw new HttpException(409, `You're email ${userData.email} not found`);

    const isPasswordMatching: boolean = await compare(userData.password, findUser.password);
    if (!isPasswordMatching) throw new HttpException(409, "You're password not matching");

    const tokenData = this.createToken(findUser);

    return { tokenData, user: findUser };
  }

  public async logout(userData: UserI): Promise<UserI> {
    if (isEmpty(userData)) throw new HttpException(400, "You're not userData");

    const findUser: UserI = await this.users.findOne({ email: userData.email, password: userData.password });
    if (!findUser) throw new HttpException(409, `You're email ${userData.email} not found`);

    return findUser;
  }

  public createToken(user: UserI): TokenDataI {
    const dataStoredInToken: DataStoredInTokenI = { _id: user._id };
    const secretKey: string = SECRET_KEY;
    const expiresIn: number = 60 * 60;

    return { expiresIn, token: sign(dataStoredInToken, secretKey, { expiresIn }) };
  }

  public createCookie(tokenData: TokenDataI): string {
    return `Authorization=${tokenData.token}; HttpOnly; Max-Age=${tokenData.expiresIn};`;
  }

  public async forgotPassword(email: string): Promise<UserI> {
    const user: UserI = await this.users.findOne({ email });
    if (!user) throw new HttpException(400, `Email not registered`);
    const resetToken = await this.resetPasswordToken.create({ user: user._id, token: randomBytes(40).toString('hex'), used: false });
    forgotPassword(user, FRONTEND_RESET_PASSWORD_DOMAIN.replace(':token', resetToken.token));
    return user;
  }

  public async resetPassword(token: string, password: string): Promise<UserI> {
    const resetToken = await this.resetPasswordToken.findOne({ token, used: false });
    if (!resetToken) throw new HttpException(400, `Token is invalid`);
    const hashedPassword = await hash(password, 10);
    const user = await this.users.findOneAndUpdate({ _id: resetToken.user }, { $set: { password: hashedPassword } });
    resetToken.used = true;
    await resetToken.save();
    return user;
  }

  public async changePassword(user: UserI, password: string): Promise<UserI> {
    const hashedPassword = await hash(password, 10);
    const userUpdated = await this.users.findOneAndUpdate(
      { _id: user._id },
      { $set: { password: hashedPassword, firstTimeLogin: false } },
      { new: true },
    );
    return userUpdated;
  }
}

export default AuthService;
