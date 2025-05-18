const express = require('express');
const router = express.Router();
const blogController = require('../controllers/blogController');
const auth = require('../middleware/auth');

// Home page route
router.get('/', blogController.getAllPosts);

// Create post routes - must come before the /:id routes
router.get('/posts/new', auth, blogController.getNewPostForm);
router.post('/posts/new', auth, blogController.createPost);

// Post routes with ID
router.get('/posts/:id', blogController.getPost);
router.get('/posts/:id/edit', auth, blogController.getEditForm);
router.post('/posts/:id/edit', auth, blogController.updatePost);
router.post('/posts/:id/delete', auth, blogController.deletePost);

module.exports = router; 