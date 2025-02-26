import mongoose from 'mongoose';

const cartSchema = mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'User',
  },
  products: [
    {
      _id: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Product',
      },
      title: { type: String, required: true },
      price: { type: Number, required: true },
      quantity: { type: Number, required: true },
      total: { type: Number, required: true },
      discountPercentage: { type: Number, required: true },
      discountedTotal: { type: Number, required: true },
      thumbnail: { type: String, required: true },
    },
  ],
  type: { type: String, required: true },
  title: String,
  total: { type: Number, required: true },
  discountedTotal: { type: Number, required: true },
  totalProducts: { type: Number, required: true },
  totalQuantity: { type: Number, required: true },
});

const Cart = mongoose.model('Cart', cartSchema);
export default Cart;
