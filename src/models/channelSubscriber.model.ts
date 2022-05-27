import { model, Schema, Document, PaginateModel } from 'mongoose';
import { ChannelSubscriberI } from '@interfaces/models/channelSubscriber.interface';
import mongoosePaginate from 'mongoose-paginate-v2';
import { ModelNames } from '@/enums/common';

const channelSubscriberSchema: Schema = new Schema(
  {
    isActive: {
      type: Boolean,
      required: false,
      default: false,
    },
    paymentId: {
      type: String,
      required: true,
    },
    channel: { type: Schema.Types.ObjectId, ref: ModelNames.CHANNEL, required: true },
    user: { type: Schema.Types.ObjectId, ref: ModelNames.USER, required: true },
  },
  {
    timestamps: true,
  },
);

channelSubscriberSchema.plugin(mongoosePaginate);

const CategorySubscriberModel = model<ChannelSubscriberI & Document, PaginateModel<ChannelSubscriberI & Document>>(
  ModelNames.CHANNEL_SUBSCRIBER,
  channelSubscriberSchema,
);

export default CategorySubscriberModel;
