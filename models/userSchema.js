import mongoose from "mongoose";

// Define the schema
const userSchema = mongoose.Schema({
    username: {
        type: String,
        required: [true, "please add the user name"]
    }, 
    email: {
        type: String,
        required: [true, "please add the email address"],
        unique: [true, "email address already taken"]
    },
    password: {
        type: String,
        required: [true, "please add the user password"]
    }
}, {
    timestamps: true
});

// Create and export the model
const User = mongoose.model("User", userSchema);
export default User;
