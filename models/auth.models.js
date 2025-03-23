import mongoose from "mongoose";
import bcrypt from 'bcrypt';

const userSchema = mongoose.Schema({
    username: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true
    },
    number: {
        type: Number,
        required: true,
    },
    password: {
        type: String,
        required: true
    }
} , {timestaps: true})


// Password hashing before saving the user
userSchema.pre('save', async function (next) {
    if (!this.isModified('password')) return next();

    try {
        const salt = await bcrypt.genSalt(10);
        this.password = await bcrypt.hash(this.password, salt);
        next();
    } catch (error) {
        next(error);
    }
});

/** @type {import("mongoose").Model} */
const User = mongoose.model('NewUser', userSchema);

export {
    User
}