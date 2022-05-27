import { model, Schema, Document, PaginateModel } from 'mongoose';
import { ChannelI } from '@interfaces/models/channel.interface';
import mongoosePaginate from 'mongoose-paginate-v2';
import { paymentTypes, PaymentType, ModelNames } from '@/enums/common';

const channelSchema: Schema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    isPaid: {
      type: Boolean,
      required: false,
      default: false,
    },
    paymentType: {
      type: String,
      enum: paymentTypes,
      default: PaymentType.CHARGE,
      required: false,
    },
    cost: {
      type: Number,
      required: false,
      default: 0,
    },
    author: { type: Schema.Types.ObjectId, ref: ModelNames.USER, required: true },
    tags: { type: [], required: false, default: [] },
  },
  {
    timestamps: true,
  },
);

channelSchema.plugin(mongoosePaginate);
channelSchema.index({ name: 'text' });

const ChannelModel = model<ChannelI & Document, PaginateModel<ChannelI & Document>>(ModelNames.CHANNEL, channelSchema);

export default ChannelModel;
