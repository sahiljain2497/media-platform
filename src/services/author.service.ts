import UserModel from '@/models/user.model';

export default class AuthorService {
  public userModel = UserModel;

  public async getAuthors(filter: any, options: any) {
    const authors = await this.userModel.paginate(filter, options);
    return authors;
  }

  public async getAuthorDetail(filter: any) {
    const author = await this.userModel.findOne(filter);
    return author;
  }
}
