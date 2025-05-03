import express from "express";
import userController from "../controllers/userControllers.js";
import validateToken from "../middleware/authMiddleware.js";

const { registerUser, loginUser, currentUser } = userController;


const router = express.Router();

// Register user via API
router.post('/register', registerUser);

// User login via API
router.post('/login', loginUser);

// Get current user (would typically be protected by middleware)
router.get('/current', validateToken, currentUser);

export default router;
