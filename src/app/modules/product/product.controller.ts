import { Request, Response } from 'express';
import { productServices } from './product.service';
import productValidationSchema from './product.validation';

// for upload a product
const createProduct = async (req: Request, res: Response) => {
  try {
    const { product: productData } = req.body;

    // validation by zod
    const zodParseData = productValidationSchema.parse(productData);
    const result = await productServices.createProductInDB(zodParseData);

    // response
    res.status(200).json({
      success: true,
      message: 'Product created successfully!',
      data: result,
    });
  } catch (error) {
    console.log(error);
  }
};

// for get all products
const getAllProduct = async (req: Request, res: Response) => {
  try {
    const result = await productServices.getAllProductFromDB();

    // response
    res.status(200).json({
      success: true,
      message: 'Products fetched successfully!',
      data: result,
    });
  } catch (error) {
    console.log(error);
  }
};

// for find single product by id
const getProductById = async (req: Request, res: Response) => {
  try {
    const { productId } = req.params;

    const result = await productServices.getSingleProductById(productId);

    // response
    res.status(200).json({
      success: true,
      message: 'Product fetched successfully!',
      data: result,
    });
  } catch (error) {
    console.log(error);
  }
};

export const productController = {
  createProduct,
  getAllProduct,
  getProductById,
};
