import { Request, Response } from 'express';
import { productServices } from './product.service';
import productValidationSchema from './product.validation';
import { z } from 'zod';

// Handle validation errors
const handleValidationError = (res: Response, error: z.ZodError) => {
  const errors = error.errors.map((err) => ({
    field: err.path.join('.'),
    message: err.message,
  }));
  return res.status(400).json({ success: false, errors });
};

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
    if (error instanceof z.ZodError) {
      return handleValidationError(res, error);
    }
    console.log(error);
    res.status(500).json({ success: false, message: 'Internal Server Error' });
  }
};

// for get all products
const getAllProduct = async (req: Request, res: Response) => {
  try {
    const searchTerm: string | undefined = req.query.searchTerm as
      | string
      | undefined;

    const result = await productServices.getAllProductFromDB(searchTerm);
    // response
    res.status(200).json({
      success: true,
      message: 'Products fetched successfully!',
      data: result,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: 'Internal Server Error' });
  }
};

// for find single product by id
const getProductById = async (req: Request, res: Response) => {
  try {
    const { productId } = req.params;

    const result = await productServices.getSingleProductByIdFromDB(productId);

    // response
    res.status(200).json({
      success: true,
      message: 'Product fetched successfully!',
      data: result,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: 'Internal Server Error' });
  }
};

// update a product
const updateProductById = async (req: Request, res: Response) => {
  try {
    const { productId } = req.params;
    const updateDoc = req.body;

    const updateZodParser = productValidationSchema.parse(updateDoc);

    const result = await productServices.updateSingleProductByIdFromDB(
      productId,
      updateZodParser,
    );

    // response
    res.status(200).json({
      success: true,
      message: 'Product updated successfully!',
      data: result,
    });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return handleValidationError(res, error);
    }
    console.log(error);
    res.status(500).json({ success: false, message: 'Internal Server Error' });
  }
};

// delete a product
const deleteProductById = async (req: Request, res: Response) => {
  try {
    const { productId } = req.params;

    const result = await productServices.deleteProductFromDB(productId);

    // response
    res.status(200).json({
      success: true,
      message: 'Product deletd successfully!',
      data: null,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: 'Internal Server Error' });
  }
};

export const productController = {
  createProduct,
  getAllProduct,
  getProductById,
  updateProductById,
  deleteProductById,
};
