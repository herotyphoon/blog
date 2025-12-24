const express = require('express');

const {
    handleRenderHomePage,
    handleRenderSignupPage,
    handleRenderLoginPage,
    handleUserSignup,
    handleUserLogin
} = require('../controllers/root.controllers.js');

const router = express.Router();

router.get('/', handleRenderHomePage);

module.exports = router;