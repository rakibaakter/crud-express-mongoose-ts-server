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
    } else {
      return {
        success: false,
        message: 'Order not found',
        data: null,
      };
    }
  } catch (error) {
    console.log(error);
  }
};

const getAllOrderFromDB = async (emailForSearch?: string) => {
  try {
    if (emailForSearch) {
      let query = {};
      query = { email: { $eq: emailForSearch } };
      const result = await OrderModel.find(query);
      return {
        status: 200,
        success: true,
        message: 'Orders fetched successfully for user email!',
        data: result,
      };
    } else {
      const result = await OrderModel.find();
      return {
        status: 200,
        success: true,
        message: 'Orders fetched successfully !',
        data: result,
      };
    }
  } catch (error) {
    console.log(error);
  }
};

export const orderServices = {
  createOrderInDB,
  getAllOrderFromDB,
};
