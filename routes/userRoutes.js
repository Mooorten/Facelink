const express = require('express');
const userController = require('../controllers/userController');
const router = express.Router();

// Opret en ny bruger
router.post('/', userController.createUser);

// Hent en brugers posts
router.get('/:id/posts', userController.getUserPosts);

// Find brugeren med flest posts
router.get('/most-posts', userController.userWithMostPosts);

module.exports = router;
