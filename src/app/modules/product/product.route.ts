import express from 'express';
import { productController } from './product.controller';

const router = express.Router();

// post product
router.post('/', productController.createProduct);

// get all product
router.get('/', productController.getAllProduct);

export const productRoute = router;
