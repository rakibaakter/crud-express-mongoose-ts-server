import { ProductModel } from '../product/product.model';
import { TOrder } from './order.interface';
import { OrderModel } from './order.model';

// upload order on database
const createOrderInDB = async (order: TOrder) => {
  const { productId, quantity } = order;

  try {
    const product = await ProductModel.findById(productId);
    if (product) {
      if (product.inventory.quantity < quantity) {
        return {
          status: 200,
          success: false,
          message: 'Insufficient quantity available in inventory',
          data: null,
        };
      } else {
        const updatedQuantity = product.inventory.quantity - quantity;
        let inStock = true;
        if (updatedQuantity < 1) {
          inStock = false;
        }
        const updatedInventory = { inStock, quantity: updatedQuantity };
        const updatedProduct = await ProductModel.findByIdAndUpdate(productId, {
          inventory: updatedInventory,
        });

        if (updatedProduct) {
          console.log(updatedProduct);

          const result = await OrderModel.create(order);
          console.log(result);

          return {
            status: 200,
            success: true,
            message: 'Order created successfully!',
            data: result,
          };
        }
      }
    }
  } catch (error) {
    console.log(error);
  }

  // const result = await OrderModel.create(order);

  // return result;
  // return productId;
};

const getAllOrderFromDB = async (emailForSearch?: string) => {
  let query = {};
  if (emailForSearch) {
    query = { email: { $eq: emailForSearch } };
  }
  const result = await OrderModel.find(query);

  return result;
};

export const orderServices = {
  createOrderInDB,
  getAllOrderFromDB,
};
