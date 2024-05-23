import { Request, Response } from 'express';
import { productServices } from './product.service';

// for upload a product
const createProduct = async (req: Request, res: Response) => {
  try {
    const { product: productData } = req.body;
    const result = await productServices.createProductInDB(productData);

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

export const productController = {
  createProduct,
  getAllProduct,
};
