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
exports.orderServices = void 0;
const product_model_1 = require("../product/product.model");
const order_model_1 = require("./order.model");
// upload order on database
const createOrderInDB = (order) => __awaiter(void 0, void 0, void 0, function* () {
    const { productId, quantity } = order;
    try {
        const product = yield product_model_1.ProductModel.findById(productId);
        if (product) {
            if (product.inventory.quantity < quantity) {
                return {
                    status: 200,
                    success: false,
                    message: 'Insufficient quantity available in inventory',
                    data: null,
                };
            }
            else {
                const updatedQuantity = product.inventory.quantity - quantity;
                let inStock = true;
                if (updatedQuantity < 1) {
                    inStock = false;
                }
                const updatedInventory = { inStock, quantity: updatedQuantity };
                const updatedProduct = yield product_model_1.ProductModel.findByIdAndUpdate(productId, {
                    inventory: updatedInventory,
                });
                if (updatedProduct) {
                    console.log(updatedProduct);
                    const result = yield order_model_1.OrderModel.create(order);
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
        else {
            return {
                success: false,
                message: 'Order not found',
                data: null,
            };
        }
    }
    catch (error) {
        console.log(error);
    }
});
const getAllOrderFromDB = (emailForSearch) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (emailForSearch) {
            let query = {};
            query = { email: { $eq: emailForSearch } };
            const result = yield order_model_1.OrderModel.find(query);
            return {
                status: 200,
                success: true,
                message: 'Orders fetched successfully for user email!',
                data: result,
            };
        }
        else {
            const result = yield order_model_1.OrderModel.find();
            return {
                status: 200,
                success: true,
                message: 'Orders fetched successfully !',
                data: result,
            };
        }
    }
    catch (error) {
        console.log(error);
    }
});
exports.orderServices = {
    createOrderInDB,
    getAllOrderFromDB,
};
