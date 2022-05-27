export interface CommentI {
  _id: string;
  content: string;
  post: string;
  parentComment: string;
  user: string;
  likeCount: number;
  dislikeCount: number;
  createdAt: Date;
  updatedAt: Date;
}
