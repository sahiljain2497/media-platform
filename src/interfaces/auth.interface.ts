import { Request } from 'express';
import { UserI } from '@/interfaces/models/user.interface';

export interface DataStoredInTokenI {
  _id: string;
}

export interface TokenDataI {
  token: string;
  expiresIn: number;
}

export interface AuthRequestI extends Request {
  user: UserI;
}

export interface LoginRes {
  tokenData: TokenDataI;
  user: UserI;
}
