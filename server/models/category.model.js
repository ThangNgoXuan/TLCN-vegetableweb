import mongoose from 'mongoose'

const productCategorySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    image: {
      type: String
    },
    displayOrder: {
      type: Number,
      required: true,
    },
    status: {
      type: Boolean,
      default: true
    }
  },
  {
    timestamps: true,
  }
);

const ProductCategory = mongoose.model('ProductCategory', productCategorySchema);
export default ProductCategory;