import mongoose from 'mongoose';

const productSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    images: [{ type: String, required: true }],
    brand: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Brand'
    },
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'ProductCategory'
    },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    qtyInStock: { type: Number, required: true, default: 0 },
    sold: { type: Number, required: true, default: 0 },
    creator: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    certification: { type: String },
    discount: { type: Number, default: 0 },
    status: { type: Boolean, default: true, required: true },
  },
  {
    timestamps: true,
  }
);
const Product = mongoose.model('Product', productSchema);

export default Product;