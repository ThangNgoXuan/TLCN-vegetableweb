import mongoose from 'mongoose'

const orderSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User',
    },
    orderItems: [
      {
        quantity: { type: Number, required: true },
        product: {
          type: mongoose.Schema.Types.ObjectId,
          required: true,
          ref: 'Product',
        },
        price: { type: Number, required: true },
        discount: { type: Number, default: 0 }
      },
    ],
    firstName: {
      type: String,
      required: true,
      trim: true
    },
    lastName: {
      type: String,
      required: true,
      trim: true
    },
    mail: {
      type: String,
      required: true,
      trim: true
    },
    phone: {
      type: String,
      required: true,
      trim: true
    },
    shipAddress: {
      type: String,
      trim: true
    },
    address: {
      province: { type: String },
      district: { type: String },
      ward: { type: String },
      detail: { type: String },
    },
    paymentMethod: {
      type: String,
      required: true,
      default: 'COD'
    },
    isPaid: {
      type: Boolean,
      default: false
    },
    onlinePaymentResult: {
      id: String,
      status: String,
      update_time: String,
      email_address: String,
    },
    paidAt: {
      type: Date,
    },
    totalPrice: {
      type: Number,
      required: true,
    },
    message: {
      type: String,
      trim: true
    },
    status: {
      type: String,
      required: true,
      default: 'DANG_XU_LY'
    }
  },
  {
    timestamps: true,
  }
)

const Order = mongoose.model('Order', orderSchema)

export default Order