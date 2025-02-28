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
      name: user.name,
      email: user.email,
      admin: user.admin,
    });
  } else {
    res.status(401);
    throw new Error('Invalid email or password');
  }
});

/* 
    @desc: Register a new user
    @route: POST /api/user
    @access: public
*/
const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;
  const exists = await User.findOne({ email });

  if (exists) {
    res.status(400);
    throw new Error('User already exists');
  }

  const user = await User.create({
    name,
    email,
    password,
  });

  if (user) {
    generateToken(res, user._id);
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
    });
  } else {
    res.status(400);
    throw new Error('Invalid user data');
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
    @route: GET /api/user
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
    @route: PUT /api/user
    @access: private
*/
const updateUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);

  if (user) {
    user.name = req.body.name || user.name;
    user.email = req.body.email || user.email;
    if (req.body.password) {
      user.password = req.body.password;
    }
    const updatedUser = await user.save();

    res.status(200).json({
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
    });
  } else {
    res.status(404);
    throw new Error('User not found');
  }
});

/* 
    @desc: Delete user
    @route: DELETE /api/user
    @access: private
*/
const deleteUserProfile = asyncHandler(async (req, res) => {
  const { userId } = req.params;
  const user = await Resume.deleteOne({ _id: userId });
  if (user) {
    res.status(200).json({ message: 'User profile deleted', _id: userId });
  } else {
    res.status(400);
    throw new Error('Could not delete user');
  }
});

export {
  authUser,
  registerUser,
  logoutUser,
  getUserProfile,
  updateUserProfile,
  deleteUserProfile,
};
