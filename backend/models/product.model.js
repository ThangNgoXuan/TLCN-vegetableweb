import mongoose, { Schema } from 'mongoose';

const reviewSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    comment: { type: String, required: true },
    star: { type: Number, required: true, min: 0, max: 5, default: 0 },
    author: {
      type: Schema.Types.ObjectId,
      ref: 'User'
    }
  },
  {
    timestamps: true,
  }
);
const productSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    images: [{ type: String, required: true }],
    brand: { type: String, required: true },
    category: {
      type: Schema.Types.ObjectId,
      ref: 'ProductCategory'
    },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    qtyInStock: { type: Number, required: true },
    starAVg: { type: Number, required: true, default: 0 },
    reviews: [reviewSchema],
  },
  {
    timestamps: true,
  }
);
const Product = mongoose.model('Product', productSchema);

export default Product;