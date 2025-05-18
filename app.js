const express = require('express');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const methodOverride = require('method-override');
const blogRoutes = require('./src/routes/blogRoutes');
const authRoutes = require('./src/routes/authRoutes');
const userAuth = require('./src/middleware/userAuth');
const User = require('./src/models/User');
require('dotenv').config();
const path = require('path');

// Configure mongoose
mongoose.set('strictQuery', false);

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
  console.log('Connected to MongoDB');
}).catch((err) => {
  console.error('MongoDB connection error:', err);
});

const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(methodOverride('_method'));
app.use(express.static('public'));

// Set view engine
app.set('view engine', 'ejs');

// Global user middleware
app.use(userAuth);

// Favicon handling - must come before routes
app.get('/favicon.ico', (req, res) => {
  res.status(204).end(); // No content response
});

// Routes
app.use('/auth', authRoutes);
app.use('/', blogRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).render('error', { error: 'Something went wrong!' });
});

// 404 handler
app.use((req, res) => {
  res.status(404).render('error', { error: 'Page not found' });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
