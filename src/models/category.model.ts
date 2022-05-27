import { model, Schema, Document, PaginateModel } from 'mongoose';
import { CategoryI } from '@interfaces/models/category.interface';
import mongoosePaginate from 'mongoose-paginate-v2';
import { ModelNames } from '@/enums/common';

const categorySchema: Schema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    platform: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  },
);

categorySchema.plugin(mongoosePaginate);

const CategoryModel = model<CategoryI & Document, PaginateModel<CategoryI & Document>>(ModelNames.CATEGORY, categorySchema);

export default CategoryModel;
