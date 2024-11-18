const express = require('express');
const router = express.Router();
const postController = require('../controllers/postController');

// GET /posts/new - Vis formular for at oprette en post
router.get('/posts/new', postController.getNewPostForm);

// POST /posts - Opretter en ny post
router.post('/posts', postController.createPost);

// GET /posts - Hent alle posts (med søgefunktionalitet)
router.get('/posts', postController.getAllPosts);

// POST /posts/:id/like - Like et post
router.post('/posts/:id/like', postController.likePost);

//router.post('/posts/:id/delete', postController.deletePost);

module.exports = router;
