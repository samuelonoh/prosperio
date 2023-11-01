import express from 'express';


import { 
    deleteProfile,
    getProfile,
    loginUser,
    logoutUser,
    registerUser,
    updateProfile,
    uploadProfilePicture,
    loginStatus,
    forgotPassword,
    resetPassword,
} from '../controllers/userController.js';
import { protect } from '../middleware/authMiddleware.js';
import { validateUserFields, validateUpdateProfile } from '../middleware/userValidator.js';

const router = express.Router();

// Route for email verification
router.get('/verify-email', async (req, res) => {
  const { token } = req.query;

  if (!token) {
    res.status(400).json({ message: 'Missing verification token' });
    return;
  }

  try {
    // Verify the JWT token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Find the user by email and update the email verification status
    const user = await User.findOneAndUpdate(
      { email: decoded.email },
      { isEmailVerified: true, emailVerificationToken: null }
    );

    if (!user) {
      res.status(404).json({ message: 'User not found' });
      return;
    }

    res.json({ message: 'Email verified successfully' });
  } catch (error) {
    res.status(400).json({ message: 'Invalid verification token' });
  }
});

// User registration route
router.post('/', validateUserFields, registerUser)

// User login route
router.post('/login', loginUser)

// User logout route
router.post('/logout', logoutUser)

// Get logged-in user's profile route
router.get('/me', protect, getProfile)

// Get logged-in user's profile route
router.get('/loggedin', protect, loginStatus)

// Update user profile route
router.put('/updateProfile', validateUpdateProfile, protect, updateProfile)

// Delete user profile route
router.delete('/deleteProfile', protect, deleteProfile)

// forgot Password
router.post('/forgotPassword', forgotPassword)

// forgot reset Password
router.put('/resetPassword/:resetToken', resetPassword)

// Update user profile photo
router.put('/uploadProfilePicture', protect,  uploadProfilePicture)




export default router;