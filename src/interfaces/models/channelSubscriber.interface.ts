export interface ChannelSubscriberI {
  _id: string;
  channel: string;
  user: string;
  paymentId: string;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}
