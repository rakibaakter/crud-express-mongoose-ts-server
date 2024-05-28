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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.productController = void 0;
const product_service_1 = require("./product.service");
const product_validation_1 = __importDefault(require("./product.validation"));
const zod_1 = require("zod");
// Handle validation errors
const handleValidationError = (res, error) => {
    const errors = error.errors.map((err) => ({
        field: err.path.join('.'),
        message: err.message,
    }));
    return res.status(400).json({ success: false, errors });
};
// for upload a product
const createProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { product: productData } = req.body;
        // validation by zod
        const zodParseData = product_validation_1.default.parse(productData);
        const result = yield product_service_1.productServices.createProductInDB(zodParseData);
        // response
        res.status(200).json({
            success: true,
            message: 'Product created successfully!',
            data: result,
        });
    }
    catch (error) {
        if (error instanceof zod_1.z.ZodError) {
            return handleValidationError(res, error);
        }
        console.log(error);
        res.status(500).json({ success: false, message: 'Internal Server Error' });
    }
});
// for get all products
const getAllProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const searchTerm = req.query.searchTerm;
        const result = yield product_service_1.productServices.getAllProductFromDB(searchTerm);
        // response
        res.status(200).json({
            success: true,
            message: 'Products fetched successfully!',
            data: result,
        });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: 'Internal Server Error' });
    }
});
// for find single product by id
const getProductById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { productId } = req.params;
        const result = yield product_service_1.productServices.getSingleProductByIdFromDB(productId);
        // response
        res.status(200).json({
            success: true,
            message: 'Product fetched successfully!',
            data: result,
        });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: 'Internal Server Error' });
    }
});
// update a product
const updateProductById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { productId } = req.params;
        const updateDoc = req.body;
        const updateZodParser = product_validation_1.default.parse(updateDoc);
        const result = yield product_service_1.productServices.updateSingleProductByIdFromDB(productId, updateZodParser);
        // response
        res.status(200).json({
            success: true,
            message: 'Product updated successfully!',
            data: result,
        });
    }
    catch (error) {
        if (error instanceof zod_1.z.ZodError) {
            return handleValidationError(res, error);
        }
        console.log(error);
        res.status(500).json({ success: false, message: 'Internal Server Error' });
    }
});
// delete a product
const deleteProductById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { productId } = req.params;
        const result = yield product_service_1.productServices.deleteProductFromDB(productId);
        // response
        res.status(200).json({
            success: true,
            message: 'Product deletd successfully!',
            data: null,
        });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: 'Internal Server Error' });
    }
});
exports.productController = {
    createProduct,
    getAllProduct,
    getProductById,
    updateProductById,
    deleteProductById,
};
