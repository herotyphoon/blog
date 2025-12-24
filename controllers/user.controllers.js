const bcrypt = require("bcrypt");

const User = require('../models/user.model.js');
const {setUser} = require('../services/auth.service.js');

function handleRenderSignupPage (req, res) {
    res.render('signup');
}

function handleRenderLoginPage (req, res) {
    res.render('login');
}

async function handleUserSignup(req, res) {
    const { fullName, email, password } = req.body;

    await User.create({
        fullName,
        email,
        password,
    });

    return res.redirect('/login');
}

async function handleUserLogin (req, res) {
    const { email, password } = req.body;

    const passwordCheck = await User.verifyPassword(email, password);

    if (!passwordCheck) {
        res.cookie('Verified', false , { httpOnly: true, maxAge: 30 * 1000 });
        return res.status(401).redirect('/user/login');
    }

    const user = await User.findOne({ email });
    const token = setUser(user);
    res.cookie('__sessionID', token, { httpOnly: true });

    return res.redirect('/');
}

module.exports = {
    handleRenderSignupPage,
    handleRenderLoginPage,
    handleUserSignup,
    handleUserLogin
};