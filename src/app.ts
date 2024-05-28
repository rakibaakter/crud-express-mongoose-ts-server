import express, { Request, Response } from 'express';
import cors from 'cors';
import { productRoute } from './app/modules/product/product.route';
import { orderRoute } from './app/modules/order/order.route';

const app = express();

// parsers
app.use(express.json());
app.use(cors());

// application route for product
app.use('/api/products', productRoute);
app.use('/api/orders', orderRoute);

app.get('/', (req: Request, res: Response) => {
  res.send('Hello World!');
});

// invalid endpoint checker;
app.all('*', (req: Request, res: Response) => {
  res.status(404).json({
    success: false,
    message: 'Route not found',
  });
});

export default app;
