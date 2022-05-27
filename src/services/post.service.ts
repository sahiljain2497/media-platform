import PostModel from '@/models/post.model';

export default class PostService {
  public postModel = PostModel;

  public async getPosts(filter: any, options: any) {
    const posts = await this.postModel.paginate(filter, options);
    return posts;
  }

  public async getPostDetail(filter: any) {
    const post = await this.postModel.findOne(filter);
    return post;
  }
}
