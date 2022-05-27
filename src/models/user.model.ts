import { model, Schema, Document, PaginateModel } from 'mongoose';
import { UserI } from '@/interfaces/models/user.interface';
import { ModelNames } from '@/enums/common';
import mongoosePaginate from 'mongoose-paginate-v2';

const userSchema: Schema = new Schema(
  {
    fullName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    picture: {
      type: String,
      required: true,
    },
    about: {
      type: String,
      required: false,
    },
    dob: {
      type: String,
      required: false,
    },
    interests: {
      type: [],
      required: false,
      default: [],
    },
    stripeCustomerId: {
      type: String,
      required: false,
    },
    stripeAccountId: {
      type: String,
      required: false,
    },
  },
  {
    timestamps: true,
  },
);

userSchema.plugin(mongoosePaginate);
userSchema.index({ fullName: 'text' });

const UserModel = model<UserI & Document, PaginateModel<UserI & Document>>(ModelNames.USER, userSchema);

export default UserModel;
