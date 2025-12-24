require('dotenv').config({quiet: true});
const bcrypt = require('bcrypt');

const { Schema, model } = require('mongoose');
const { hashPassword } = require('../services/hash.service.js');

const userSchema = new Schema({
    fullName: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
    },
    password: {
        type: String,
        required: true,
    },
    profileImageURL: {
        type: String,
        default: './images/default.png',
    },
    role: {
        type: String,
        enum: ['user', 'admin'],
        default: 'user',
    }
},
    { timestamps: true }
);

userSchema.pre('save', async function () {
    const user = this;

    if (!user.isModified('password')) return;

    this.password = await hashPassword(user.password);
});

userSchema.static('verifyPassword', async function (email, password) {
    const user = await this.findOne({ email });
    if (!user) return false;

    return bcrypt.compare(password, user.password);
});

module.exports = model("User", userSchema);