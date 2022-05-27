import { model, Schema, Document } from 'mongoose';
import { ResourceManagerI } from '@/interfaces/models/resourceManager.interface';
import mongoosePaginate from 'mongoose-paginate-v2';
import { ModelNames, RequestStatus, requestStatus } from '@/enums/common';

const resourceManagerSchema: Schema = new Schema(
  {
    manager: { type: Schema.Types.ObjectId, ref: ModelNames.USER, required: true },
    modelId: {
      type: Schema.Types.ObjectId,
      required: true,
      refPath: 'onModel',
    },
    onModel: {
      type: String,
      required: true,
      enum: [ModelNames.CHANNEL, ModelNames.POST, ModelNames.USER],
    },
    requestStatus: { type: String, enum: requestStatus, required: true, default: RequestStatus.PENDING },
  },
  {
    timestamps: true,
  },
);

resourceManagerSchema.plugin(mongoosePaginate);

const ResourceManagerModel = model<ResourceManagerI & Document>(ModelNames.RESOURCE_MANAGER, resourceManagerSchema);

export default ResourceManagerModel;
