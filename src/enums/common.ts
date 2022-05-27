export enum PaymentType {
  CHARGE = 'CHARGE',
  SUBSCRIPTION = 'SUBSCRIPTION',
}

export enum RequestStatus {
  PENDING = 'PENDING',
  ACCEPTED = 'ACCEPTED',
  REJECTED = 'REJECTED',
  REVOKED = 'REVOKED',
}

export enum Reaction {
  SHARE = 'SHARE',
  LIKE = 'LIKE',
  DISLIKE = 'DISLIKE',
  FOLLOW = 'FOLLOW',
}

export enum MediaType {
  VIDEO = 'VIDEO',
  PHOTO = 'PHOTO',
  AUDIO = 'AUDIO',
}

export enum ModelNames {
  ADMIN = 'Admin',
  POST = 'Post',
  PLATFORM = 'Platform',
  COMMENT = 'Comment',
  CHANNEL = 'Channel',
  REACTION = 'Reaction',
  USER = 'User',
  CATEGORY = 'Category',
  CHANNEL_SUBSCRIBER = 'ChannelSubscriber',
  REPORT = 'Report',
  RESOURCE_MANAGER = 'ResourceManager',
  RESET_PASSWORD_TOKEN = 'ResetPasswordToken',
}

export const paymentTypes = Object.entries(PaymentType).map(([key, value]) => value);
export const requestStatus = Object.entries(RequestStatus).map(([key, value]) => value);
export const reactions = Object.entries(Reaction).map(([key, value]) => value);
export const mediaTypes = Object.entries(MediaType).map(([key, value]) => value);
