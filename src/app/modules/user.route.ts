import express from 'express';
import { UserControllers } from './user.controller';

const router = express.Router();

router.post('/api/users', UserControllers.createUser);

router.get('/api/users/:userId', UserControllers.getSingleUser);

router.delete('/api/users/:userId', UserControllers.deleteUser);

router.put('/api/users/:userId', UserControllers.updateUser);

router.get('/api/users', UserControllers.getAllUsers);

router.put('/api/users/:userId/orders', UserControllers.createUserOrders);

router.get('/api/users/:userId/orders', UserControllers.getOrdersSingleUser);

router.get(
  '/api/users/:userId/orders/total-price',
  UserControllers.getTotalPriceOrder,
);

export const UserRoutes = router;
