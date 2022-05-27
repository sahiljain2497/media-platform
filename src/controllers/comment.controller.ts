import { NextFunction, Request, Response } from 'express';
import pick from '@/utils/pick';
import CommentService from '@/services/comment.service';
import { AuthRequestI } from '@/interfaces/auth.interface';

class CommentController {
  public commentService = new CommentService();

  public getComments = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const options = pick(req.query, ['page', 'limit', 'sortBy']);
      const filter = pick(req.params, ['parent', 'modelId', 'onModel']);
      const comments = await this.commentService.getComments(filter, options);
      res.send({ data: comments, message: 'list of comments' });
    } catch (error) {
      next(error);
    }
  };

  public createComment = async (req: AuthRequestI, res: Response, next: NextFunction) => {
    try {
      const data = pick(req.body, ['content', 'onModel', 'modelId', 'parent']);
      data.user = req.user._id;
      const comment = await this.commentService.createComment(data);
      res.send({ data: { comment }, message: 'Comment created' });
    } catch (error) {
      next(error);
    }
  };

  public updateComment = async (req: AuthRequestI, res: Response, next: NextFunction) => {
    try {
      const filter = pick(req.params, ['commentId']);
      const data = pick(req.body, ['content']);
      const comment = await this.commentService.updateComment(filter, data);
      res.send({ data: { comment }, message: 'comment updated' });
    } catch (error) {
      next(error);
    }
  };

  public deleteComment = async (req: AuthRequestI, res: Response, next: NextFunction) => {
    try {
      const data = pick(req.params, ['commentId']);
      const comment = await this.commentService.deleteComment(data);
      res.send({ data: { comment }, message: 'deleted comment' });
    } catch (error) {
      next(error);
    }
  };
}

export default CommentController;
