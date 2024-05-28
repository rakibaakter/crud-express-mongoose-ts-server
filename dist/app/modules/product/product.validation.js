"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const zod_1 = require("zod");
const variantSchema = zod_1.z.object({
    type: zod_1.z.string().min(1, { message: 'Variant type is required' }),
    value: zod_1.z.string().min(1, { message: 'Variant value is required' }),
});
const inventorySchema = zod_1.z.object({
    quantity: zod_1.z
        .number()
        .int({ message: 'Quantity must be an integer' })
        .positive({ message: 'Quantity must be a positive number' }),
    inStock: zod_1.z.boolean({ message: 'InStock status must be a boolean' }),
});
const productValidationSchema = zod_1.z.object({
    name: zod_1.z.string().min(1, { message: 'Product name is required' }),
    description: zod_1.z
        .string()
        .min(1, { message: 'Product description is required' }),
    price: zod_1.z.number().positive({ message: 'Price must be a positive number' }),
    category: zod_1.z.string().min(1, { message: 'Category is required' }),
    tags: zod_1.z
        .array(zod_1.z.string().min(1, { message: 'Tag cannot be empty' }))
        .nonempty({ message: 'Tags are required' }),
    variants: zod_1.z
        .array(variantSchema)
        .nonempty({ message: 'At least one variant is required' }),
    inventory: inventorySchema,
});
exports.default = productValidationSchema;
