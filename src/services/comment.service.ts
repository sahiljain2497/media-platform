import CommentModel from '@/models/comment.model';

export default class CommentService {
  public commentModel = CommentModel;

  public async getComments(filters: any, options: any) {
    const comments = await this.commentModel.paginate(filters, options);
    return comments;
  }

  public async createComment(data) {
    const comment = await this.commentModel.create(data);
    await comment.populate('onModel');
    return comment;
  }

  public async updateComment(filters, data) {
    const comment = await this.commentModel.findOneAndUpdate(filters, { $set: data }, { new: true });
    await comment.populate('onModel');
    return comment;
  }

  public async deleteComment(filters) {
    const comment = await this.commentModel.findOneAndDelete(filters);
    return comment;
  }
}
