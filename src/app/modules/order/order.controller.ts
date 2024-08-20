import { Request, Response } from 'express';
import { orderValidationSchema } from './order.validation';
import { orderServices } from './order.service';
import { z } from 'zod';
import { productServices } from '../product/product.service';
import { Product } from '../product/product.interface';

// Handle validation errors
const handleValidationError = (res: Response, error: z.ZodError) => {
  const errors = error.errors.map((err) => ({
    field: err.path.join('.'),
    message: err.message,
  }));
  return res.status(400).json({ success: false, errors });
};

// for uploading an order
const createOrder = async (req: Request, res: Response) => {
  try {
    const orderData = req.body;

    // Validate the order data using Zod schema
    const zodParseData = orderValidationSchema.parse(orderData);

    // Fetch the product by ID from the database
    let product: Product | null =
      await productServices.getSingleProductByIdFromDB(zodParseData.productId);

    if (!product) {
      // If the product is not found, return an error response
      return res.status(404).json({
        success: false,
        message: 'Product not found',
      });
    }

    const availableQuantity = product.inventory.quantity;
    const orderedQuantity = zodParseData.quantity;

    // Check if the ordered quantity exceeds the available quantity
    if (orderedQuantity > availableQuantity) {
      return res.status(400).json({
        success: false,
        message: 'Insufficient quantity available in inventory',
      });
    }

    // Update the inventory quantity and inStock status
    const newQuantity = availableQuantity - orderedQuantity;
    product = {
      ...product,
      inventory: {
        ...product.inventory,
        quantity: newQuantity,
        inStock: newQuantity > 0,
      },
    };

    // Update the product in the database
    await productServices.updateSingleProductByIdFromDB(
      zodParseData.productId,
      product,
    );

    // Create the order in the database
    const result = await orderServices.createOrderInDB(zodParseData);

    // Send a successful response
    res.status(result?.status as number).json({
      success: result?.success,
      message: result?.message,
      data: result?.data,
    });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return handleValidationError(res, error);
    }
    console.error(error);
    res.status(500).json({ success: false, message: 'Internal Server Error' });
  }
};

// for get all products
const getAllOrder = async (req: Request, res: Response) => {
  try {
    const email: string | undefined = req.query.email as string | undefined;

    const result = await orderServices.getAllOrderFromDB(email);
    // response

    res.status(result?.status as number).json({
      success: result?.success,
      message: result?.message,
      data: result?.data,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: 'Internal Server Error' });
  }
};

export const orderController = {
  createOrder,
  getAllOrder,
};
