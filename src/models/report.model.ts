import { model, Schema, Document } from 'mongoose';
import { ReportI } from '@interfaces/models/report.interface';
import mongoosePaginate from 'mongoose-paginate-v2';
import { ModelNames } from '@/enums/common';

const reportSchema: Schema = new Schema(
  {
    reason: {
      type: String,
      required: true,
    },
    proof: {
      type: [],
      required: false,
    },
    user: { type: Schema.Types.ObjectId, ref: ModelNames.USER, required: true },
    post: { type: Schema.Types.ObjectId, ref: ModelNames.POST, required: true },
  },
  {
    timestamps: true,
  },
);

reportSchema.plugin(mongoosePaginate);

const ReportModel = model<ReportI & Document>(ModelNames.REPORT, reportSchema);

export default ReportModel;
