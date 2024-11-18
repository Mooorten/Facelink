const express = require('express');
const router = express.Router();
const postController = require('../controllers/postController');

// GET /posts/new - Show form for create post
router.get('/posts/new', postController.getNewPostForm);

// POST /posts - Create new post
router.post('/posts', postController.createPost);

// GET /posts - Get all posts
router.get('/posts', postController.getAllPosts);

// POST /posts/:id/like - Give a like
router.post('/posts/:id/like', postController.likePost);

module.exports = router;