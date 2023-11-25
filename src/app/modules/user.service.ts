import { TUsers, UserModel } from './user.interface';
import { Users } from './user.model';

const createUserIntoDB = async (user: TUsers) => {
  const result = await Users.create(user);
  return result;
};

// =======================================================

// const createUserIntoDB = async (userData: TUsers) => {
//   if (await Users.isUserExists(userData.userId)) {
//     throw new Error('User already exists!');
//   }
//   const result = await Users.create(userData);
//   return result;
// };

const getAllUsersFromDB = async () => {
  const result = await Users.find();
  return result;
};

const getSingleUserFromDB = async (userId: number) => {
  try {
    const result = await Users.findOne({ userId: userId }).exec();
    return result;
  } catch (error) {
    console.error('Error fetching user:', error);
    throw error;
  }
};

const deleteUserFromDB = async (userId: number) => {
  const result = await Users.updateOne({ userId }, { isDeleted: true });
  return result;
};

const updateUserInDB = async (userId: number, userInfo: any) => {
  const result = await Users.updateOne({ userId }, { $set: userInfo });
  return result;
};

export const UserServices = {
  createUserIntoDB,
  getAllUsersFromDB,
  getSingleUserFromDB,
  deleteUserFromDB,
  updateUserInDB,
};
