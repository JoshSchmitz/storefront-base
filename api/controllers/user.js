import asyncHandler from 'express-async-handler';
import generateToken from '../utils/generate-token.js';
import User from '../models/user.js';

/* 
    @desc: Register a new user
    @route: POST /api/users
    @access: public
*/
const registerUser = asyncHandler(async (req, res) => {
  const { firstName, lastName, email, password } = req.body;
  const exists = await User.findOne({ email });

  if (exists) {
    res.status(400);
    throw new Error('User already exists');
  }

  const user = await User.create({
    firstName,
    lastName,
    username: email,
    email,
    password,
    role: 'user',
  });

  if (user) {
    generateToken(res, user._id);
    res.status(201).json({
      _id: user._id,
      name: `${user.firstName} ${user.lastName}`,
      username: user.username,
      email: user.email,
      role: user.role,
    });
  } else {
    res.status(400);
    throw new Error('Invalid user data');
  }
});

/* 
    @desc: Get user
    @route: GET /api/users/:userId
    @access: public
*/
const getUser = asyncHandler(async (req, res) => {
  const { userId } = req.params;
  if (userId) {
    const user = await User.findById(userId);
    if (user) {
      res.status(200).json(user);
    } else {
      res.status(404);
      throw new Error('User not found');
    }
  } else {
    const users = await User.find();
    if (users) {
      res.status(200).json(users);
    } else {
      res.status(404);
      throw new Error('Users not found');
    }
  }
});

/* 
    @desc: Update user
    @route: PUT /api/users/:userId
    @access: public
*/
const updateUser = asyncHandler(async (req, res) => {
  const { userId } = req.params;
  const user = await User.findById(userId);
  if (user) {
    user.firstName = req.body.firstName || user.firstName;
    user.lastName = req.body.lastName || user.lastName;
    user.maidenName = req.body.maidenName || user.maidenName;
    user.age = req.body.age || user.age;
    user.gender = req.body.gender || user.gender;
    user.email = req.body.email || user.email;
    user.phone = req.body.phone || user.phone;
    user.username = req.body.username || user.username;
    if (req.body.password) {
      user.password = req.body.password;
    }
    user.birthDate = req.body.birthDate || user.birthDate;
    user.image = req.body.image || user.image;
    user.ip = req.body.id || user.ip;
    user.address = req.body.address || user.address;
    user.bank = req.body.bank || user.bank;
    user.company.name = req.body.companyName || user.company.name;
    user.company.title = req.body.companyTitle || user.company.title;
    user.company.department =
      req.body.companyDepartment || user.company.department;
    user.company.address.address =
      req.body.companyAddress || user.company.address.address;
    user.company.address.city =
      req.body.companyCity || user.company.address.city;
    user.company.address.state =
      req.body.companyState || user.company.address.state;
    user.company.address.stateCode =
      req.body.companyStateCode || user.company.address.stateCode;
    user.company.address.postalCode =
      req.body.companyPostalCode || user.company.address.postalCode;
    user.company.address.country =
      req.body.companyCountry || user.company.address.country;
    user.company.address.coordinates.lat =
      req.body.companyLat || user.company.address.coordinates.lat;
    user.company.address.coordinates.lng =
      req.body.companyLng || user.company.address.coordinates.lng;
    user.crypto = req.body.crypto || user.crypto;
    user.role = req.body.role || user.role;

    const updatedUser = await user.save();
    res.status(200).json(updatedUser);
  } else {
    res.status(404);
    throw new Error('User not found');
  }
});

/* 
    @desc: Delete user
    @route: DELETE /api/users/:userId
    @access: public
*/
const deleteUser = asyncHandler(async (req, res) => {
  const { userId } = req.params;
  const user = await Resume.deleteOne({ _id: userId });
  if (user) {
    res.status(200).json({ message: 'User deleted', _id: userId });
  } else {
    res.status(400);
    throw new Error('Could not delete user');
  }
});

export { registerUser, getUser, updateUser, deleteUser };
