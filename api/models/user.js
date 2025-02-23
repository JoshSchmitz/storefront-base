import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const userSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      unique: true,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    admin: { type: Boolean, default: false },
    cart: {
      status: { type: String, default: 'active' },
      products: [
        {
          _id: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: 'Product',
          },
          name: { type: String, required: true },
          price: { type: Number, required: true },
          quantity: { type: Number, required: true },
        },
      ],
      quantity: { type: Number, default: 0 },
      total: { type: Number, default: 0 },
    },
  },
  { timestamps: true }
);

userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) {
    next();
  }
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

userSchema.methods.matchPassword = async function (sentPassword) {
  return await bcrypt.compare(sentPassword, this.password);
};

const User = mongoose.model('User', userSchema);
export default User;
