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
    }
  }
);

const ProductCategory = mongoose.model('ProductCategory', productCategorySchema);
export default ProductCategory;