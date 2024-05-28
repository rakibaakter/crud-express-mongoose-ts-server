"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.productRoute = void 0;
const express_1 = __importDefault(require("express"));
const product_controller_1 = require("./product.controller");
const router = express_1.default.Router();
// post product
router.post('/', product_controller_1.productController.createProduct);
// get all product
router.get('/', product_controller_1.productController.getAllProduct);
// get single product by id
router.get('/:productId', product_controller_1.productController.getProductById);
// update a single product
router.put('/:productId', product_controller_1.productController.updateProductById);
// delete a product
router.delete('/:productId', product_controller_1.productController.deleteProductById);
exports.productRoute = router;
