import express from 'express';
import {
  authUser,
  registerUser,
  logoutUser,
  getUserProfile,
  updateUserProfile,
  deleteUserProfile,
} from '../controllers/user.js';
import { protect } from '../middleware/authenticate.js';

// instantiate router
const router = express.Router();

// routes
router
  .route('/')
  .get(protect, getUserProfile)
  .post(registerUser)
  .put(protect, updateUserProfile)
  .delete(protect, deleteUserProfile);
router.post('/auth', authUser);
router.post('/logout', logoutUser);

export default router;
