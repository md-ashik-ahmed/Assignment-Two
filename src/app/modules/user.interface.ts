import { Model } from 'mongoose';

export type TUserName = {
  firstName: string;
  lastName: string;
};

export type TAddress = {
  street: string;
  city: string;
  country: string;
};

export type TOrders = {
  productName: string;
  price: number;
  quantity: number;
};

export type TUsers = {
  userId: string;
  username: string;
  password: string;
  fullName: TUserName;
  age: number;
  email: string;
  // isActive?: 'active' | 'blocked';
  hobbies: string[];
  address: TAddress;
  orders?: TOrders[];
  isDeleted: boolean;
};

export interface UserModel extends Model<TUsers> {
  isUserExists(id: string): Promise<TUsers | null>;
}
