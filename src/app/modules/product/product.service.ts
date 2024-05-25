import { ProductModel } from './product.model';
import { Product } from './product.interface';

// upload product on database
const createProductInDB = async (product: Product) => {
  const result = await ProductModel.create(product);

  return result;
};

// get all product from db
// const getAllProductFromDB = async (searchText: string | undefined) => {
//   console.log(searchText);
//   const searchTerm = searchText[0].toUpperCase() + searchText.substring(1);
//   console.log(searchTerm);

//   const result = await ProductModel.find();

//   return result;
// };

const getAllProductFromDB = async (searchTerm?: string) => {
  let query = {};

  if (searchTerm) {
    query = {
      $or: [
        { name: { $regex: searchTerm, $options: 'i' } }, //$option i for make the search item case insensitive
        { description: { $regex: searchTerm, $options: 'i' } },
        { category: { $regex: searchTerm, $options: 'i' } },
        { tags: { $regex: searchTerm, $options: 'i' } },
      ],
    };
  }

  const result = await ProductModel.find(query);

  return result;
};

// get single product by id
const getSingleProductByIdFromDB = async (id: string) => {
  const result = await ProductModel.findById(id);
  return result;
};

// update a single product

const updateSingleProductByIdFromDB = async (
  id: string,
  updateDoc: Product,
) => {
  const result = await ProductModel.findByIdAndUpdate(id, updateDoc);
  return result;
};

// delete a product
const deleteProductFromDB = async (id: string) => {
  const result = await ProductModel.findByIdAndDelete(id);
  return result;
};

// // get products by search param
// const getProductsBySearchParamFromDB = async (searchTerm: string) => {
//   // if()
//   const result = await ProductModel.find();
//   return result;
// };

export const productServices = {
  createProductInDB,
  getAllProductFromDB,
  getSingleProductByIdFromDB,
  updateSingleProductByIdFromDB,
  deleteProductFromDB,
  // getProductsBySearchParamFromDB,
};
