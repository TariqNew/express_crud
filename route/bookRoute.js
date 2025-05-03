import express from "express"
import { createBook, updateBook, getAllBooks, getSingleBook, deleteBook } from "../controllers/bookControllers.js";
import validateToken from "../middleware/authMiddleware.js";



const router = express.Router()

router.use(validateToken)

// Fetch all data from API
router.get('/api', getAllBooks);

// Fetch a single item from API
router.get('/api/:id', getSingleBook);

// Create item via API
router.post('/api', createBook);

// Update item via API
router.put('/api/:id', updateBook);

// Delete item via API
router.delete('/api/:id', deleteBook);

export default router;
