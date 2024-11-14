const express = require('express');
const postController = require('../controllers/postController');
const router = express.Router();

// Opret en ny post
router.post('/:id', postController.createPost);

// Like en post
router.post('/:post_id/like', postController.likePost);

// Slet en post
router.delete('/:post_id', postController.deletePost);

module.exports = router;
