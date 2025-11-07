const mongoose = require("mongoose");

// Create Schema
const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    age: {
        type: Number,
    },
}, { timestamps: true });

// Create Model
const User = mongoose.model('User', UserSchema);

module.exports = User;
