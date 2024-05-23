import { ProductModel } from './product.model';
import { Product } from './product.interface';

// upload product on database
const createProductInDB = async (product: Product) => {
  const result = await ProductModel.create(product);

  return result;
};

// get all product from db
const getAllProductFromDB = async () => {
  const result = await ProductModel.find();

  return result;
};

// get single product by id
const getSingleProductById = async (id: string) => {
  const result = await ProductModel.findById(id);
  return result;
};

export const productServices = {
  createProductInDB,
  getAllProductFromDB,
  getSingleProductById,
};
