import { z } from 'zod';

const userNameSchema = z.object({
  firstName: z.string(),
  lastName: z.string(),
});

const addressSchema = z.object({
  street: z.string(),
  city: z.string(),
  country: z.string(),
});

const ordersSchema = z.object({
  productName: z.string(),
  price: z.number(),
  quantity: z.number(),
});

const userValidationSchema = z.object({
  userId: z.string(),
  username: z.string(),
  password: z.string(),
  fullName: userNameSchema,
  age: z.number(),
  email: z.string().email(),
  isActive: z.enum(['active', 'blocked']).default('active'),
  hobbies: z.array(z.string()),
  address: addressSchema,
  orders: ordersSchema,
});

export default userValidationSchema;
