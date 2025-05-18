const User = require('../models/User');
const jwt = require('jsonwebtoken');

// Get login page
exports.getLogin = (req, res) => {
  res.render('login');
};

// Handle login
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (!user || !(await user.comparePassword(password))) {
      return res.render('login', { error: 'Invalid email or password' });
    }

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '24h' });
    res.cookie('token', token, { httpOnly: true });
    res.redirect('/');
  } catch (error) {
    console.error('Login error:', error);
    res.render('login', { error: 'An error occurred during login' });
  }
};

// Get signup page
exports.getSignup = (req, res) => {
  res.render('signup');
};

// Handle signup
exports.signup = async (req, res) => {
  try {
    const { username, email, password } = req.body;
    
    // Check if user already exists
    const existingUser = await User.findOne({ $or: [{ email }, { username }] });
    if (existingUser) {
      return res.render('signup', { error: 'Email or username already exists' });
    }

    // Create new user
    const user = new User({ username, email, password });
    await user.save();

    // Generate token and set cookie
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '24h' });
    res.cookie('token', token, { httpOnly: true });
    res.redirect('/');
  } catch (error) {
    console.error('Signup error:', error);
    res.render('signup', { error: 'An error occurred during signup' });
  }
};

// Handle logout
exports.logout = (req, res) => {
  res.clearCookie('token');
  res.redirect('/');
}; 