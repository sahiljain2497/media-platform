export interface ChannelI {
  _id: string;
  name: string;
  user: string;
  isPaid: string;
  cost: number;
  paymentType: string;
  tags: string[];
  createdAt: Date;
  updatedAt: Date;
}
