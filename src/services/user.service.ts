import { hash } from 'bcrypt';
import { CreateUserDto } from '@dtos/users.dto';
import { HttpException } from '@exceptions/HttpException';
import { UserI } from '@/interfaces/models/user.interface';
import userModel from '@/models/user.model';
import { isEmpty } from '@utils/util';

class UserService {
  public users = userModel;

  public async findAllUser(): Promise<UserI[]> {
    const users: UserI[] = await this.users.find();
    return users;
  }

  public async findUserById(userId: string): Promise<UserI> {
    if (isEmpty(userId)) throw new HttpException(400, "You're not userId");

    const findUser: UserI = await this.users.findOne({ _id: userId });
    if (!findUser) throw new HttpException(409, "You're not user");

    return findUser;
  }

  public async createUser(userData: CreateUserDto): Promise<UserI> {
    if (isEmpty(userData)) throw new HttpException(400, "You're not userData");

    const findUser: UserI = await this.users.findOne({ email: userData.email });
    if (findUser) throw new HttpException(409, `You're email ${userData.email} already exists`);

    const hashedPassword = await hash(userData.password, 10);
    const createUserData: UserI = await this.users.create({ ...userData, password: hashedPassword });

    return createUserData;
  }

  public async updateUser(userId: string, userData: CreateUserDto): Promise<UserI> {
    if (isEmpty(userData)) throw new HttpException(400, "You're not userData");

    if (userData.email) {
      const findUser: UserI = await this.users.findOne({ email: userData.email });
      if (findUser && findUser._id != userId) throw new HttpException(409, `You're email ${userData.email} already exists`);
    }

    if (userData.password) {
      const hashedPassword = await hash(userData.password, 10);
      userData = { ...userData, password: hashedPassword };
    }

    const updateUserById: UserI = await this.users.findByIdAndUpdate(userId, { userData });
    if (!updateUserById) throw new HttpException(409, "You're not user");

    return updateUserById;
  }

  public async deleteUser(userId: string): Promise<UserI> {
    const deleteUserById: UserI = await this.users.findByIdAndDelete(userId);
    if (!deleteUserById) throw new HttpException(409, "You're not user");

    return deleteUserById;
  }
}

export default UserService;
