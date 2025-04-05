import express from 'express';
import {
  authUser,
  logoutUser,
  getUserProfile,
  updateUserProfile,
  deleteUserProfile,
} from '../controllers/profile.js';
import { protect } from '../middleware/authenticate.js';

// instantiate router
const router = express.Router();

// routes
router
  .route('/profile')
  .get(protect, getUserProfile)
  .put(protect, updateUserProfile)
  .delete(protect, deleteUserProfile);
router.post('/auth', authUser);
router.post('/logout', logoutUser);

export default router;
