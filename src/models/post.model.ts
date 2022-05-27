import { model, Schema, Document, PaginateModel } from 'mongoose';
import { PostI } from '@/interfaces/models/post.interface';
import mongoosePaginate from 'mongoose-paginate-v2';
import { mediaTypes, ModelNames } from '@/enums/common';

const mediaSchema: Schema = new Schema({
  url: { type: String, required: true },
  type: { type: String, required: true, enum: mediaTypes },
  versions: { type: Schema.Types.Mixed, required: false },
});

const postSchema: Schema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: false,
    },
    platform: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: ModelNames.PLATFORM,
    },
    category: { type: Schema.Types.ObjectId, ref: ModelNames.CATEGORY, required: true, index: true },
    channel: { type: Schema.Types.ObjectId, ref: ModelNames.CHANNEL, required: true, index: true },
    author: { type: Schema.Types.ObjectId, ref: ModelNames.USER, required: true, index: true },
    isPublished: { type: String, required: true },
    publishedAt: { type: Date, required: false },
    tags: { type: [], required: false, default: [] },
    media: {
      type: [mediaSchema],
      required: false,
      default: [],
    },
  },
  {
    timestamps: true,
  },
);

postSchema.plugin(mongoosePaginate);
postSchema.index({ title: 'text' });

const PostModel = model<PostI & Document, PaginateModel<PostI & Document>>(ModelNames.POST, postSchema);

export default PostModel;
