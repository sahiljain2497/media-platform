import { model, Schema, Document, PaginateModel } from 'mongoose';
import mongoosePaginate from 'mongoose-paginate-v2';
import { CommentI } from '@/interfaces/models/comment.interface';
import { ModelNames } from '@/enums/common';

const commentSchema: Schema = new Schema(
  {
    content: {
      type: String,
      required: true,
    },
    parent: {
      type: Schema.Types.ObjectId,
      required: false,
      ref: ModelNames.COMMENT,
    },
    modelId: {
      type: Schema.Types.ObjectId,
      required: true,
      refPath: 'onModel',
      index: true,
    },
    onModel: {
      type: String,
      required: true,
      enum: [ModelNames.POST, ModelNames.CHANNEL, ModelNames.USER],
    },
    user: { type: Schema.Types.ObjectId, ref: ModelNames.USER, required: true },
  },
  {
    timestamps: true,
  },
);

commentSchema.plugin(mongoosePaginate);

const CommentModel = model<CommentI & Document, PaginateModel<CommentI & Document>>(ModelNames.COMMENT, commentSchema);

export default CommentModel;
