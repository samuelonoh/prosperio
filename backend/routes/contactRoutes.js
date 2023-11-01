import express from 'express';
import contactUs from '../controllers/contactController.js';
// Create an instance of the Express router
const router = express.Router();
import { protect } from '../middleware/authMiddleware.js';


// Define your route
router.post("/", protect, contactUs);

// Export the router
export default router;