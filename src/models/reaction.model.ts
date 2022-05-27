import { model, Schema, Document } from 'mongoose';
import { ReactionI } from '@/interfaces/models/reaction.interface';
import { ModelNames, reactions } from '@/enums/common';

const reactionSchema: Schema = new Schema(
  {
    type: {
      type: String,
      enum: reactions,
      required: true,
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
      enum: ['Post', 'Comment', 'Channel'],
    },
    user: { type: Schema.Types.ObjectId, ref: ModelNames.USER, required: true },
  },
  {
    timestamps: true,
  },
);

const ReactionModel = model<ReactionI & Document>(ModelNames.REACTION, reactionSchema);

export default ReactionModel;
