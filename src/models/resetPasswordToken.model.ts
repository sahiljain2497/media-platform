import { model, Schema, Document } from 'mongoose';
import { ResetPasswordTokenI } from '@/interfaces/models/resetPasswordToken.interface';
import { ModelNames } from '@/enums/common';

const resetPasswordTokenSchema: Schema = new Schema(
  {
    token: {
      type: String,
      required: true,
    },
    used: {
      type: Boolean,
      required: false,
      default: false,
    },
    user: { type: Schema.Types.ObjectId, ref: ModelNames.USER, required: true },
  },
  {
    timestamps: true,
  },
);

const ResetPasswordTokenModel = model<ResetPasswordTokenI & Document>(ModelNames.RESET_PASSWORD_TOKEN, resetPasswordTokenSchema);

export default ResetPasswordTokenModel;
