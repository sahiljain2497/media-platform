import PlatformService from '@/services/platform.service';
import PostService from '@/services/post.service';
import CategoryService from '@/services/category.service';
import ChannelService from '@/services/channel.service';
import { NextFunction, Request, Response } from 'express';
import pick from '@/utils/pick';
import AuthorService from '@/services/author.service';
import CommentService from '@/services/comment.service';

class IndexController {
  public platformService = new PlatformService();
  public categoryService = new CategoryService();
  public channelService = new ChannelService();
  public authorService = new AuthorService();
  public postService = new PostService();
  public commentService = new CommentService();

  public index = (req: Request, res: Response, next: NextFunction) => {
    try {
      res.sendStatus(200);
    } catch (error) {
      next(error);
    }
  };

  public platforms = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const platforms = await this.platformService.getPlatforms();
      res.send({ data: platforms, message: 'List of platforms' });
    } catch (error) {
      next(error);
    }
  };

  public categories = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const filter = pick(req.query, ['platform']);
      const categories = await this.categoryService.getCategories(filter);
      res.send({ data: categories, message: 'List of categories' });
    } catch (error) {
      next(error);
    }
  };

  public channels = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const filter = pick(req.query, ['author']);
      const channels = await this.channelService.getChannels(filter);
      res.send({ data: channels, message: 'List of channels' });
    } catch (error) {
      next(error);
    }
  };

  public authors = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const filter = pick(req.query, ['fullName']);
      const options = pick(req.query, ['page', 'limit', 'sortBy']);
      const channels = await this.authorService.getAuthors(filter, options);
      res.send({ data: channels, message: 'List of authors' });
    } catch (error) {
      next(error);
    }
  };

  public authorDetails = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const filter = { _id: req.params.authorId };
      const author = await this.authorService.getAuthorDetail(filter);
      res.send({ data: { author }, message: 'Author Details' });
    } catch (error) {
      next(error);
    }
  };
}

export default IndexController;
