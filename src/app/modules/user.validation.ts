import { z } from 'zod';

const NameValidationSchema = z.object({
  firstName: z.string().min(1).max(20),
  lastName: z.string().min(1).max(20),
});

const AddressValidationSchema = z.object({
  street: z.string().min(1),
  city: z.string().min(1),
  country: z.string().min(1),
});

const OrderValidationSchema = z.object({
  productName: z.string().min(1),
  price: z.number().min(0),
  quantity: z.number().min(1),
});

const userValidationSchema = z.object({
  userId: z.string().min(1),
  username: z.string().min(1),
  password: z.string().min(1),
  fullName: NameValidationSchema,
  age: z.number().min(0),
  email: z.string().email(),

  hobbies: z.array(z.string()),
  address: AddressValidationSchema,
  orders: z.array(OrderValidationSchema),
  isDeleted: z.boolean().optional().default(false),
});

// =================================================
// const NameValidationSchema = z.object({
//   firstName: z
//     .string()
//     .min(1)
//     .max(20)
//     .refine((value) => /^[A-Z]/.test(value), {
//       message: 'First Name must start with a capital letter',
//     }),
//   lastName: z.string(),
// });

// const AddressValidationSchema = z.object({
//   street: z.string(),
//   city: z.string(),
//   country: z.string(),
// });

// const OrderValidationSchema = z.object({
//   productName: z.string(),
//   price: z.number(),
//   quantity: z.number(),
// });

// const userValidationSchema = z.object({
//   userId: z.string(),
//   username: z.string(),
//   password: z.string(),
//   fullName: NameValidationSchema,
//   age: z.number(),
//   email: z.string().email(),

//   hobbies: z.array(z.string()),
//   address: AddressValidationSchema,
//   orders: z.array(OrderValidationSchema),
// });

export default userValidationSchema;
