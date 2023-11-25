import { TUsers, TOrders } from './user.interface';
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
  const result = await Users.aggregate();
  return result;
};

// const getSingleUserFromDB = async (userId: number) => {
//   try {
//     const result = await Users.findOne({ userId: userId }).exec();
//     return result;
//   } catch (error) {
//     console.error('Error fetching user:', error);
//     throw error;
//   }
// };

const getSingleUserFromDB = async (userId: number) => {
  const result = await Users.aggregate([{ $match: { userId } }]);
  return result;
};

const deleteUserFromDB = async (userId: number) => {
  const result = await Users.updateOne({ userId }, { isDeleted: true });
  return result;
};

const updateUserInDB = async (userId: number, userInfo: any) => {
  const result = await Users.updateOne({ userId }, { $set: userInfo });
  return result;
};

const getOrdersFromDB = async (userId: number) => {
  const result = await Users.findOne({ userId: userId }, { orders: 1 });
  if (!result) {
    throw new Error('user not found');
  }
  return result;
};

const userOrdersCreateInToDb = async (newOrder: TOrders, id: number) => {
  const result = await Users.updateOne(
    { userId: id },
    {
      $push: {
        orders: {
          $each: [newOrder],
        },
      },
    },
  );
  return result;
};

const getTotalOrderPriceFromDB = async (userId: number) => {
  const result = await Users.findOne({ userId });
  if (!result || !result.orders) {
    throw new Error('user not found');
  }

  const totalPrice = result.orders.reduce((total, order) => {
    const totalOrderPrice = order.price * order.quantity;
    return total + totalOrderPrice;
  }, 0);

  return totalPrice;
};

export const UserServices = {
  createUserIntoDB,
  getAllUsersFromDB,
  getSingleUserFromDB,
  deleteUserFromDB,
  updateUserInDB,
  getOrdersFromDB,
  userOrdersCreateInToDb,
  getTotalOrderPriceFromDB,
};
