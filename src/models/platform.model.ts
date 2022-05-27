import { model, Schema, Document, PaginateModel } from 'mongoose';
import { PlatformI } from '@interfaces/models/platform.interface';
import mongoosePaginate from 'mongoose-paginate-v2';
import { ModelNames } from '@/enums/common';

const platformSchema: Schema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  },
);

platformSchema.plugin(mongoosePaginate);

const PlatformModel = model<PlatformI & Document, PaginateModel<PlatformI & Document>>(ModelNames.PLATFORM, platformSchema);

export default PlatformModel;
