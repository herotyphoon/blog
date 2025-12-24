const express = require('express');

const {
    handleRenderSignupPage,
    handleRenderLoginPage,
    handleUserSignup,
    handleUserLogin
} = require('../controllers/user.controllers.js');
const { verifyPassword } = require('../middleware/auth.middleware.js')

const router = express.Router();

router.get('/signup', handleRenderSignupPage);

router.get('/login', handleRenderLoginPage);

router.post('/signup', handleUserSignup);

router.post('/login', handleUserLogin);

module.exports = router;