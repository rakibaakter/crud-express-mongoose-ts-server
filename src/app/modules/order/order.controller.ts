import { Request, Response } from 'express';
import { orderValidationSchema } from './order.validation';
import { orderServices } from './order.service';

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
    console.log(error);
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
  }
};

export const orderController = {
  createOrder,
  getAllOrder,
};
