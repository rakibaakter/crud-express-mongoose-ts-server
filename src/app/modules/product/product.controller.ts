import { Request, Response } from 'express';
import { productServices } from './product.service';
import productValidationSchema from './product.validation';
import { string } from 'zod';

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
    console.log(error);
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
  }
};

// find products by the search query
const getProductsBySearchParam = async (req: Request, res: Response) => {
  try {
    const searchTerm = req.query.searchTerm;
    console.log(searchTerm);
  } catch (error) {
    console.log(error);
  }
};

export const productController = {
  createProduct,
  getAllProduct,
  getProductById,
  updateProductById,
  deleteProductById,
};
