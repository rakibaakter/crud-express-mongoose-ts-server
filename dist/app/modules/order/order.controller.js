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
exports.orderController = void 0;
const order_validation_1 = require("./order.validation");
const order_service_1 = require("./order.service");
const zod_1 = require("zod");
// Handle validation errors
const handleValidationError = (res, error) => {
    const errors = error.errors.map((err) => ({
        field: err.path.join('.'),
        message: err.message,
    }));
    return res.status(400).json({ success: false, errors });
};
// for upload an order
const createOrder = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { order: orderData } = req.body;
        // validation by zod
        const zodParseData = order_validation_1.orderValidationSchema.parse(orderData);
        const result = yield order_service_1.orderServices.createOrderInDB(zodParseData);
        // response
        res.status(result === null || result === void 0 ? void 0 : result.status).json({
            success: result === null || result === void 0 ? void 0 : result.success,
            message: result === null || result === void 0 ? void 0 : result.message,
            data: result === null || result === void 0 ? void 0 : result.data,
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
const getAllOrder = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const email = req.query.email;
        const result = yield order_service_1.orderServices.getAllOrderFromDB(email);
        // response
        res.status(result === null || result === void 0 ? void 0 : result.status).json({
            success: result === null || result === void 0 ? void 0 : result.success,
            message: result === null || result === void 0 ? void 0 : result.message,
            data: result === null || result === void 0 ? void 0 : result.data,
        });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: 'Internal Server Error' });
    }
});
exports.orderController = {
    createOrder,
    getAllOrder,
};
