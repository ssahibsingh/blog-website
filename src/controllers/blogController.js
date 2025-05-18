const Post = require('../models/Post');
const User = require('../models/User');

// Get all posts with pagination
exports.getAllPosts = async (req, res) => {
  try {
    // Validate and sanitize pagination parameters
    const page = Math.max(1, parseInt(req.query.page) || 1);
    const limit = Math.min(20, Math.max(1, parseInt(req.query.limit) || 10));
    const skip = (page - 1) * limit;

    // Get total count first
    const total = await Post.countDocuments();
    const totalPages = Math.ceil(total / limit);

    // If requested page is greater than total pages, redirect to last page
    if (page > totalPages && totalPages > 0) {
      return res.redirect(`/?page=${totalPages}`);
    }

    // Use lean() for better performance and ensure proper sorting
    const posts = await Post.find()
      .populate({
        path: 'author',
        select: 'username',
        options: { lean: true }
      })
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit)
      .lean();

    // Ensure we have unique posts by _id and handle missing authors
    const uniquePosts = Array.from(new Map(posts.map(post => {
      // Ensure author object exists
      if (!post.author) {
        post.author = { username: 'Unknown' };
      }
      return [post._id.toString(), post];
    })).values());

    res.render('home', {
      posts: uniquePosts,
      currentPage: page,
      totalPages,
      hasNextPage: page < totalPages,
      hasPrevPage: page > 1,
      user: req.user,
      // Add pagination info for the view
      pagination: {
        start: total === 0 ? 0 : skip + 1,
        end: Math.min(skip + limit, total),
        total
      }
    });
  } catch (error) {
    console.error('Error fetching posts:', error);
    res.status(500).render('error', { error: 'Error fetching posts' });
  }
};

// Get new post form
exports.getNewPostForm = (req, res) => {
  res.render('compose', { user: req.user });
};

// Get edit form
exports.getEditForm = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) {
      return res.status(404).render('error', { error: 'Post not found' });
    }
    
    // Check if user is the author
    if (post.author.toString() !== req.user._id.toString()) {
      return res.status(403).render('error', { error: 'Not authorized' });
    }
    
    res.render('edit', { post, user: req.user });
  } catch (error) {
    console.error('Error fetching post for edit:', error);
    res.status(500).render('error', { error: 'Error fetching post' });
  }
};

// Get single post
exports.getPost = async (req, res) => {
  try {
    // Check if the ID is valid MongoDB ObjectId
    if (!req.params.id.match(/^[0-9a-fA-F]{24}$/)) {
      return res.status(404).render('error', { error: 'Invalid post ID' });
    }

    const post = await Post.findById(req.params.id)
      .populate({
        path: 'author',
        select: 'username'
      });
      
    if (!post) {
      return res.status(404).render('error', { error: 'Post not found' });
    }
    res.render('post', { post, user: req.user });
  } catch (error) {
    console.error('Error fetching post:', error);
    res.status(500).render('error', { error: 'Error fetching post' });
  }
};

// Create new post
exports.createPost = async (req, res) => {
  try {
    const { title, content } = req.body;
    const post = new Post({
      title,
      content,
      author: req.user._id
    });
    await post.save();
    res.redirect('/');
  } catch (error) {
    console.error('Error creating post:', error);
    res.status(500).render('compose', { error: 'Error creating post', user: req.user });
  }
};

// Update post
exports.updatePost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    
    if (!post) {
      return res.status(404).render('error', { error: 'Post not found' });
    }

    // Check if user is the author
    if (post.author.toString() !== req.user._id.toString()) {
      return res.status(403).render('error', { error: 'Not authorized' });
    }

    const { title, content } = req.body;
    post.title = title;
    post.content = content;
    await post.save();

    res.redirect(`/posts/${post._id}`);
  } catch (error) {
    console.error('Error updating post:', error);
    res.status(500).render('error', { error: 'Error updating post' });
  }
};

// Delete post
exports.deletePost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    
    if (!post) {
      return res.status(404).render('error', { error: 'Post not found' });
    }

    // Check if user is the author
    if (post.author.toString() !== req.user._id.toString()) {
      return res.status(403).render('error', { error: 'Not authorized' });
    }

    await Post.deleteOne({ _id: post._id });
    res.redirect('/');
  } catch (error) {
    console.error('Error deleting post:', error);
    res.status(500).render('error', { error: 'Error deleting post' });
  }
};

exports.getHomePage = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = 6;
    const skip = (page - 1) * limit;

    const posts = await Post.find()
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit)
      .populate('author', 'username')
      .lean();

    const totalPosts = await Post.countDocuments();
    const totalPages = Math.ceil(totalPosts / limit);

    // Ensure each post has an author object, even if it's null
    const postsWithAuthor = posts.map(post => ({
      ...post,
      author: post.author || { username: 'Unknown' }
    }));

    res.render('home', {
      posts: postsWithAuthor,
      currentPage: page,
      totalPages,
      hasNextPage: page < totalPages,
      hasPrevPage: page > 1,
      nextPage: page + 1,
      prevPage: page - 1
    });
  } catch (error) {
    console.error('Error fetching posts:', error);
    res.status(500).render('error', { error: 'Error fetching posts' });
  }
}; 