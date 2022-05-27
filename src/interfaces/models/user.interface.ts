export interface UserI {
  _id: string;
  email: string;
  password: string;
  fullName: string;
  about: string;
  dob: string;
  picture: string;
  interests: string[];
  stripeCustomerId: string;
  stripeAccountId: string;
  createdAt: Date;
  updatedAt: Date;
}
