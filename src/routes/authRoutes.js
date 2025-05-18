const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const auth = require('../middleware/auth');

// Auth routes
router.get('/login', authController.getLogin);
router.post('/login', authController.login);
router.get('/signup', authController.getSignup);
router.post('/signup', authController.signup);
router.get('/logout', authController.logout);

module.exports = router; 