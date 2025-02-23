import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const userSchema = mongoose.Schema(
  {
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    maidenName: String,
    age: Number,
    gender: String,
    email: { type: String, required: true },
    phone: { type: String, required: true },
    username: { type: String, required: true },
    password: { type: String, required: true },
    birthDate: String,
    image: String,
    ip: String,
    address: [
      {
        type: { type: String, required: true },
        address: { type: String, required: true },
        city: { type: String, required: true },
        state: { type: String, required: true },
        stateCode: { type: String, required: true },
        postalCode: { type: Number, required: true },
        coordinates: {
          lat: { type: Number, required: true },
          lng: { type: Number, required: true },
        },
        country: { type: Number, required: true },
      },
    ],
    bank: [
      {
        default: { type: Boolean, required: true },
        cardExpire: { type: String, required: true },
        cardNumber: { type: Number, required: true },
        cardType: { type: String, required: true },
        currency: { type: String, required: true },
        iban: { type: String, required: true },
      },
    ],
    company: {
      department: String,
      name: String,
      title: String,
      address: {
        address: String,
        city: String,
        state: String,
        stateCode: String,
        postalCode: Number,
        coordinates: {
          lat: Number,
          lng: Number,
        },
        country: String,
      },
    },
    crypto: {
      coin: String,
      wallet: String,
      network: String,
    },
    role: { type: String, required: true },
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
