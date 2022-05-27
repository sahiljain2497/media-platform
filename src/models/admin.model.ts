import { model, Schema, Document } from 'mongoose';
import { AdminI } from '@/interfaces/models/admin.interface';
import { ModelNames } from '@/enums/common';

const adminSchema: Schema = new Schema(
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
    lastLogin: {
      type: Date,
      required: false,
    },
  },
  {
    timestamps: true,
  },
);

const AdminModel = model<AdminI & Document>(ModelNames.ADMIN, adminSchema);

export default AdminModel;
