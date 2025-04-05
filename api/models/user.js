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
    phone: String,
    username: { type: String, required: true },
    password: { type: String, required: true },
    birthDate: String,
    image: String,
    ip: String,
    address: [
      {
        type: String,
        address: String,
        city: String,
        state: String,
        stateCode: String,
        postalCode: Number,
        coordinates: {
          lat: Number,
          lng: Number,
        },
        country: Number,
      },
    ],
    bank: [
      {
        default: Boolean,
        cardExpire: String,
        cardNumber: Number,
        cardType: String,
        currency: String,
        iban: String,
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
    crypto: [
      {
        coin: String,
        wallet: String,
        network: String,
      },
    ],
    role: String,
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
