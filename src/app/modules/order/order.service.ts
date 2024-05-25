import { TOrder } from './order.interface';
import { OrderModel } from './order.model';

// upload product on database
const createOrderInDB = async (order: TOrder) => {
  const result = await OrderModel.create(order);

  return result;
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
