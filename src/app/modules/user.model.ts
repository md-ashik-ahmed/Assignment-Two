import { Schema, model } from 'mongoose';
import {
  TUserName,
  TAddress,
  TOrders,
  TUsers,
  UserModel,
} from './user.interface';

const userNameSchema = new Schema<TUserName>({
  firstName: {
    type: String,
    required: [true, 'First Name is required'],
  },

  lastName: {
    type: String,
    required: [true, 'Last Name is required'],
  },
});

const AddressSchema = new Schema<TAddress>({
  street: {
    type: String,
    required: [true, 'Street is required'],
  },
  city: {
    type: String,
    required: [true, 'City is required'],
  },
  country: {
    type: String,
    required: [true, 'Country is required'],
  },
});

const OrdersSchema = new Schema<TOrders>({
  productName: {
    type: String,
    required: [true, 'Product Name is required'],
  },
  price: {
    type: Number,
    required: [true, 'Price is required'],
  },
  quantity: {
    type: Number,
    required: [true, 'Quantity is required'],
  },
});

const UserSchema = new Schema<TUsers, UserModel>({
  userId: { type: String, required: [true, 'ID is required'], unique: true },
  username: {
    type: String,
    required: [true, 'UserName is required'],
    unique: true,
  },
  password: {
    type: String,
    required: [true, 'Password is required'],
    maxlength: [20, 'Password can not be more than 20 characters'],
  },
  fullName: { type: userNameSchema, required: [true, 'Full Name is required'] },
  age: { type: Number, required: [true, 'Age is required'] },
  email: { type: String, required: [true, 'Email is required'] },
  // isActive: {
  //   type: String,
  //   enum: {
  //     values: ['active', 'blocked'],
  //     message: '{VALUE} is not a valid status',
  //   },
  //   default: 'active',
  // },
  hobbies: {
    type: [String],
  },
  address: { type: AddressSchema, required: true },
  orders: [{ type: OrdersSchema }],
});

// UserSchema.post('save', function (doc, next) {
//   doc.password = '';
//   next();
// });

// UserSchema.statics.isUserExists = async function (id: string) {
//   const existingUser = await Users.findOne({ id });
//   return existingUser;
// };

export const Users = model<TUsers, UserModel>('Users', UserSchema);
