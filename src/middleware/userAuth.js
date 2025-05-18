const jwt = require('jsonwebtoken');
const User = require('../models/User');

const userAuth = async (req, res, next) => {
  try {
    const token = req.cookies.token || req.header('Authorization')?.replace('Bearer ', '');
    
    if (!token) {
      req.user = null;
      return next();
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findOne({ _id: decoded.userId });

    if (!user) {
      req.user = null;
      return next();
    }

    req.user = user;
    res.locals.user = user; // Make user available to all views
    next();
  } catch (error) {
    console.error('Auth error:', error);
    req.user = null;
    res.locals.user = null;
    next();
  }
};

module.exports = userAuth; 