import { Request, Response } from 'express';
import { orderValidationSchema } from './order.validation';
import { orderServices } from './order.service';
import { z } from 'zod';

// Handle validation errors
const handleValidationError = (res: Response, error: z.ZodError) => {
  const errors = error.errors.map((err) => ({
    field: err.path.join('.'),
    message: err.message,
  }));
  return res.status(400).json({ success: false, errors });
};

// for upload an order
const createOrder = async (req: Request, res: Response) => {
  try {
    const { order: orderData } = req.body;

    // validation by zod
    const zodParseData = orderValidationSchema.parse(orderData);
    const result = await orderServices.createOrderInDB(zodParseData);

    // response
    res.status(result?.status as number).json({
      success: result?.success,
      message: result?.message,
      data: result?.data,
    });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return handleValidationError(res, error);
    }
    console.log(error);
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
