import asyncHandler from "express-async-handler"
import Book from "../models/bookSchema.js";


//@desc Get all Books
//@route GET /api
//@access public
const getAllBooks = asyncHandler(async (req, res) => {
    const books = await Book.find({ user_id: req.user.id });
    res.json({ books });
});

//@desc Get a single book
//@route GET /api/:id
//@access public
const getSingleBook = asyncHandler(async (req, res) => {
    const book = await Book.findById(req.params.id);

    if (!book) {
        return res.status(404).json({ message: `The item with id ${req.params.id} not found` });
    }

    res.status(200).json(book);
});

//@desc Create a book
//@route POST /api
//@access private
const createBook = asyncHandler(async (req, res) => {
    const { name, email, phone } = req.body;

    if (!name || !email || !phone) {
        return res.status(400).json({ message: "All fields are required!" });
    }

    const book = await Book.create({
        name,
        email,
        phone,
        user_id: req.user.id
    });

    res.status(201).json(book);
});

//@desc Update a book
//@route PUT /api/:id
//@access private
const updateBook = asyncHandler(async (req, res) => {
    const book = await Book.findById(req.params.id);

    if (!book) {
        return res.status(404).json({ message: `The item with id ${req.params.id} not found` });
    }

    // Ensure the logged-in user owns the book
    if (book.user.toString() !== req.user.id) {
        return res.status(403).json({ message: "You are not authorized to update this book" });
    }

    const updatedBook = await Book.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true }
    );

    res.status(200).json(updatedBook);
});


//@desc Delete a book
//@route DELETE /api/:id
//@access private
const deleteBook = asyncHandler(async (req, res) => {
    const book = await Book.findById(req.params.id);

    if (!book) {
        return res.status(404).json({ message: `The item with id ${req.params.id} not found` });
    }

    // Ensure the logged-in user owns the book
    if (book.user.toString() !== req.user.id) {
        return res.status(403).json({ message: "You are not authorized to update this book" });
    }

    await book.deleteOne();
    res.status(200).json({ message: `Book with id ${req.params.id} deleted successfully` });
});

// Export all functions
export { getAllBooks, getSingleBook, createBook, updateBook, deleteBook };
