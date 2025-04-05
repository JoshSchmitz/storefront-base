import express from 'express';
import {
  registerUser,
  getUser,
  updateUser,
  deleteUser,
} from '../controllers/user.js';

// instantiate router
const router = express.Router();

// routes
router.route('/').get(getUser).post(registerUser);
router.route('/:userId').get(getUser).put(updateUser).delete(deleteUser);

export default router;
