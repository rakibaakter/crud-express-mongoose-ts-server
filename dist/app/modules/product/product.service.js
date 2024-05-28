"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.productServices = void 0;
const product_model_1 = require("./product.model");
// upload product on database
const createProductInDB = (product) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield product_model_1.ProductModel.create(product);
    return result;
});
// get all product from db
// const getAllProductFromDB = async (searchText: string | undefined) => {
//   console.log(searchText);
//   const searchTerm = searchText[0].toUpperCase() + searchText.substring(1);
//   console.log(searchTerm);
//   const result = await ProductModel.find();
//   return result;
// };
const getAllProductFromDB = (searchTerm) => __awaiter(void 0, void 0, void 0, function* () {
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
    const result = yield product_model_1.ProductModel.find(query);
    return result;
});
// get single product by id
const getSingleProductByIdFromDB = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield product_model_1.ProductModel.findById(id);
    return result;
});
// update a single product
const updateSingleProductByIdFromDB = (id, updateDoc) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield product_model_1.ProductModel.findByIdAndUpdate(id, updateDoc);
    return result;
});
// delete a product
const deleteProductFromDB = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield product_model_1.ProductModel.findByIdAndDelete(id);
    return result;
});
// // get products by search param
// const getProductsBySearchParamFromDB = async (searchTerm: string) => {
//   // if()
//   const result = await ProductModel.find();
//   return result;
// };
exports.productServices = {
    createProductInDB,
    getAllProductFromDB,
    getSingleProductByIdFromDB,
    updateSingleProductByIdFromDB,
    deleteProductFromDB,
    // getProductsBySearchParamFromDB,
};
