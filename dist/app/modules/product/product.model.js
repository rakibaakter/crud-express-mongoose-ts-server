"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductModel = void 0;
const mongoose_1 = require("mongoose");
// const variantSchema = new Schema<Variant>({
//   type: { type: String, required: true },
//   value: { type: String, required: true },
// });
// const inventorySchema = new Schema<Inventory>({
//   quantity: { type: Number, required: true },
//   inStock: { type: Boolean, required: true },
// });
// Create a Schema corresponding to the document interface.
const productSchema = new mongoose_1.Schema({
    name: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    category: { type: String, required: true },
    tags: { type: [String], required: true },
    variants: [
        {
            type: { type: String, required: true },
            value: { type: String, required: true },
        },
    ],
    inventory: {
        quantity: { type: Number, required: true },
        inStock: { type: Boolean, required: true },
    },
});
// middleware as hook
// productSchema.pre('findOneAndUpdate', function () {
//   console.log(this.getFilter());
//   console.log(this.getUpdate());
// });
// productSchema.post('findOneAndUpdate', (update, next) => {
//   const doc = new ProductModel(update);
//   next();
// });
// create a model
exports.ProductModel = (0, mongoose_1.model)('Product', productSchema);
