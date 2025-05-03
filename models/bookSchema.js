import mongoose from "mongoose";

// Define the schema
const bookSchema = mongoose.Schema({
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "User",
    },
    name: {
        type: String,
        required: [true, "please add the book name"]
    }, 
    email: {
        type: String,
        required: [true, "please add the email address"]
    },
    phone: {
        type: String,
        required: [true, "please add the phone number"]
    }
}, {
    timestamps: true
});

// Create and export the model
const Book = mongoose.model("Book", bookSchema);
export default Book;
