import express from 'express';
import { productController } from './product.controller';

const router = express.Router();

// post product
router.post('/', productController.createProduct);

// get all product
router.get('/', productController.getAllProduct);

// get single product by id
router.get('/:productId', productController.getProductById);

// update a single product
router.put('/:productId', productController.updateProductById);

export const productRoute = router;
