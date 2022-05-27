import { NextFunction, Request, Response } from 'express';
import pick from '@/utils/pick';
import PostService from '@/services/post.service';

class PostController {
  public postService = new PostService();

  public posts = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const options = pick(req.query, ['page', 'limit', 'sortBy']);
      const filter = pick(req.query, ['title', 'category', 'channel', 'user']);
      filter.isPublished = true;
      const posts = await this.postService.getPosts(filter, options);
      res.send({ data: posts, message: 'List of posts' });
    } catch (error) {
      next(error);
    }
  };

  public postDetails = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const filter = { _id: req.params.postId };
      filter['isPublished'] = true;
      const post = await this.postService.getPostDetail(filter);
      res.send({ data: { post }, message: 'Post Detail' });
    } catch (error) {
      next(error);
    }
  };
}

export default PostController;
