import { z } from 'zod';

const variantSchema = z.object({
  type: z.string().min(1, { message: 'Variant type is required' }),
  value: z.string().min(1, { message: 'Variant value is required' }),
});

const inventorySchema = z.object({
  quantity: z
    .number()
    .int({ message: 'Quantity must be an integer' })
    .positive({ message: 'Quantity must be a positive number' }),
  inStock: z.boolean({ message: 'InStock status must be a boolean' }),
});

const productValidationSchema = z.object({
  name: z.string().min(1, { message: 'Product name is required' }),
  description: z
    .string()
    .min(1, { message: 'Product description is required' }),
  price: z.number().positive({ message: 'Price must be a positive number' }),
  category: z.string().min(1, { message: 'Category is required' }),
  tags: z
    .array(z.string().min(1, { message: 'Tag cannot be empty' }))
    .nonempty({ message: 'Tags are required' }),
  variants: z
    .array(variantSchema)
    .nonempty({ message: 'At least one variant is required' }),
  inventory: inventorySchema,
});

export default productValidationSchema;
