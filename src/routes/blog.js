const express = require('express');
const router = express.Router();
const blogController = require('../controllers/blogController');
const auth = require('../middleware/auth');
const Post = require('../models/Post');

// Public routes
router.get('/', blogController.getAllPosts);
router.get('/posts/:id', blogController.getPost);

// Protected routes
router.get('/compose', auth, (req, res) => res.render('compose'));
router.post('/compose', auth, blogController.createPost);
router.get('/posts/:id/edit', auth, async (req, res) => {
  const post = await Post.findById(req.params.id);
  if (!post || post.author.toString() !== req.user._id.toString()) {
    return res.status(403).render('error', { error: 'Not authorized' });
  }
  res.render('edit', { post });
});
router.post('/posts/:id/edit', auth, blogController.updatePost);
router.post('/posts/:id/delete', auth, blogController.deletePost);

module.exports = router; 