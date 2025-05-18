const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const auth = require('../middleware/auth');

// Public routes
router.get('/login', (req, res) => res.render('login'));
router.get('/signup', (req, res) => res.render('signup'));
router.post('/login', authController.login);
router.post('/signup', authController.signup);

// Protected routes
router.get('/logout', auth, authController.logout);

module.exports = router; 