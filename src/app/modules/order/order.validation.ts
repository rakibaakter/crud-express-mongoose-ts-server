import { z } from 'zod';

export const orderValidationSchema = z.object({
  email: z.string().email({ message: 'Invalid email address' }),
  productId: z.string().min(1, { message: 'Product ID is required' }),
  price: z.number().positive({ message: 'Price must be a positive number' }),
  quantity: z.number().min(1, { message: 'Quantity must be at least 1' }),
});
