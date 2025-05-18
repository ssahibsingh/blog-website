const jwt = require('jsonwebtoken');
const User = require('../models/User');

const auth = (req, res, next) => {
  if (!req.user) {
    return res.redirect('/auth/login');
  }
  next();
};

module.exports = auth; 