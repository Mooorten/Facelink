// routes/postRoutes.js
const express = require('express');
const router = express.Router();
const postController = require('../controllers/postController'); // Importér post controller

// GET /posts/new - Vis formular for at oprette en post
router.get('/posts/new', postController.getNewPostForm);

// POST /posts - Opretter en ny post
router.post('/posts', postController.createPost);

// GET /posts - Hent alle posts
router.get('/posts', postController.getAllPosts);

module.exports = router;
