import { z } from 'zod';

const variantSchema = z.object({
  type: z.string().min(1),
  value: z.string().min(1),
});

const inventorySchema = z.object({
  quantity: z.number().int().positive(),
  inStock: z.boolean(),
});

const productValidationSchema = z.object({
  name: z.string().min(1),
  description: z.string().min(1),
  price: z.number().positive(),
  category: z.string().min(1),
  tags: z.array(z.string().min(1)),
  variants: z.array(variantSchema),
  inventory: inventorySchema,
});

export default productValidationSchema;
