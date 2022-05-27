export interface ResetPasswordTokenI {
  _id: string;
  token: string;
  used: boolean;
  user: string;
  createdAt: Date;
  updatedAt: Date;
}
