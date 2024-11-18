const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController'); // Importér user controller

// Hent alle brugere (viser dem på forsiden)
router.get('/', userController.getAllUsers);

// Opret en ny bruger
router.post('/users', userController.createUser);

module.exports = router;
