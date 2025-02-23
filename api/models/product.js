import mongoose from 'mongoose';

const productSchema = mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    category: { type: String, required: true },
    price: { type: Number, required: true },
    discountPercentage: { type: Number, required: true },
    rating: { type: Number, required: true },
    stock: { type: Number, required: true },
    tags: [String],
    brand: { type: String, required: true },
    sku: { type: String, required: true },
    weight: { type: Number, required: true },
    dimensions: {
      width: { type: Number, required: true },
      height: { type: Number, required: true },
      depth: { type: Number, required: true },
    },
    warrantyInformation: { type: String, required: true },
    shippingInformation: { type: String, required: true },
    availabilityStatus: { type: String, required: true },
    reviews: [
      {
        rating: Number,
        comment: String,
        date: String,
        reviewerName: String,
        reviewerEmail: String,
      },
    ],
    returnPolicy: { type: String, required: true },
    minimumOrderQuantity: { type: Number, required: true },
    meta: {
      barcode: { type: String, required: true },
      qrCode: { type: String, required: true },
    },
    images: [String],
    thumbnail: String,
  },
  { timestamps: true }
);

const Product = mongoose.model('Product', productSchema);
export default Product;
