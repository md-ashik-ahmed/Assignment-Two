import { Request, Response } from 'express';
import { UserServices } from './user.service';
import userValidationSchema from './user.validation';

const createUser = async (req: Request, res: Response) => {
  try {
    const userData = req.body;

    const zodParsedData = userValidationSchema.parse(userData);

    const result = await UserServices.createUserIntoDB(zodParsedData);

    res.status(200).json({
      success: true,
      message: 'User created succesfully',
      data: result,
    });
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: err.message || 'something went wrong',
      error: err,
    });
  }
};

const getAllUsers = async (req: Request, res: Response) => {
  try {
    const result = await UserServices.getAllUsersFromDB();

    res.status(200).json({
      success: true,
      message: 'Users retrieved succesfully',
      data: result,
    });
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: 'User not found',
      error: {
        code: 404,
        description: 'User not found!',
      },
    });
  }
};

const getSingleUser = async (req: Request, res: Response) => {
  try {
    const userId: number = Number(req.params.userId);

    const result = await UserServices.getSingleUserFromDB(userId);

    res.status(200).json({
      success: true,
      message: 'User retrieved succesfully',
      data: result,
    });
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: 'User not found',
      error: {
        code: 404,
        description: 'User not found!',
      },
    });
  }
};

const deleteUser = async (req: Request, res: Response) => {
  try {
    const userId: number = Number(req.params.userId);

    const result = await UserServices.deleteUserFromDB(userId);

    res.status(200).json({
      success: true,
      message: 'User deleted succesfully',
      data: null,
    });
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: 'User not found',
      error: {
        code: 404,
        description: 'User not found!',
      },
    });
  }
};

const updateUser = async (req: Request, res: Response) => {
  try {
    const userId: number = Number(req.params.userId);
    const updatedUser = req.body;

    const existingUser = await UserServices.getSingleUserFromDB(userId);
    if (!existingUser) {
      return res.status(404).json({
        success: false,
        message: 'User not found',
      });
    }

    const result = await UserServices.updateUserInDB(userId, updatedUser);

    res.status(200).json({
      success: true,
      message: 'User updated successfully',
      data: result,
    });
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: 'User not found',
      error: {
        code: 404,
        description: 'User not found!',
      },
    });
  }
};

const createUserOrders = async (req: Request, res: Response) => {
  try {
    const orderId = Number(req.params.userId);
    const newOrder = req.body;
    await UserServices.userOrdersCreateInToDb(newOrder, orderId);
    res.status(200).json({
      success: true,
      message: 'Order created successfully!',
      data: null,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'User not found',
      error: {
        code: 404,
        description: 'User not found!',
      },
    });
  }
};

const getOrdersSingleUser = async (req: Request, res: Response) => {
  try {
    const userId = Number(req.params.userId);
    const result = await UserServices.getOrdersFromDB(userId);
    res.status(200).json({
      success: true,
      message: 'Order fetched successfully!',
      data: result,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: 'User not found',
      error: {
        code: 404,
        description: error.message,
      },
    });
  }
};

const getTotalPriceOrder = async (req: Request, res: Response) => {
  try {
    const userId = Number(req.params.userId);
    const result = await UserServices.getTotalOrderPriceFromDB(userId);
    res.status(200).json({
      success: true,
      message: 'Get Total Price!',
      data: {
        totalPrice: result,
      },
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: 'User not found',
      error: {
        code: 404,
        description: error.message,
      },
    });
  }
};

export const UserControllers = {
  createUser,
  getAllUsers,
  getSingleUser,
  deleteUser,
  updateUser,
  createUserOrders,
  getOrdersSingleUser,
  getTotalPriceOrder,
};
