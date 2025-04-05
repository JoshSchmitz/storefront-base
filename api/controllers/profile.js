import asyncHandler from 'express-async-handler';
import generateToken from '../utils/generate-token.js';
import User from '../models/user.js';

/* 
    @desc: Authenticate user
    @route: POST /api/user/auth
    @access: public
*/
const authUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });

  if (user && (await user.matchPassword(password))) {
    generateToken(res, user._id);
    res.status(200).json({
      _id: user._id,
      name: `${user.firstName} ${user.lastName}`,
      email: user.email,
      role: user.role,
    });
  } else {
    res.status(401);
    throw new Error('Invalid email or password');
  }
});

/* 
    @desc: Logout user
    @route: POST /api/user/logout
    @access: public
*/
const logoutUser = asyncHandler(async (req, res) => {
  res.cookie('jwt', '', { httpOnly: true, expires: new Date(0) });
  res.status(200).json({ message: 'User logged out' });
});

/* 
    @desc: Get user profile
    @route: GET /api/user/profile
    @access: private
*/
const getUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);
  if (user) {
    res.status(200).json(user);
  } else {
    res.status(404);
    throw new Error('User not found');
  }
});

/* 
    @desc: Update user profile
    @route: PUT /api/user/profile
    @access: private
*/
const updateUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);
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
    @desc: Get user profile
    @route: DELETE /api/user/profile
    @access: private
*/
const deleteUserProfile = asyncHandler(async (req, res) => {
  const user = await User.deleteOne({ _id: req.user._id });
  if (user) {
    res.cookie('jwt', '', { httpOnly: true, expires: new Date(0) });
    res.status(200).json({ message: 'Profile deleted successfully.' });
  } else {
    res.status(404);
    throw new Error('User not found');
  }
});

export {
  authUser,
  logoutUser,
  getUserProfile,
  updateUserProfile,
  deleteUserProfile,
};
