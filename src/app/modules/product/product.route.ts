import express from 'express';
import { productController } from './product.controller';

const router = express.Router();

// post product
router.post('/', productController.createProduct);

export const productRoute = router;
