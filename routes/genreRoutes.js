const express = require('express');
const router = express.Router();
const genreController = require('../controller/genreController');
const authMiddleware = require('../middleware/authMiddleware');

// Public routes
router.get('/', genreController.getAllGenre);
router.get('/:id', genreController.getGenreById);

// Protected routes (JWT Auth Required)
router.post('/', authMiddleware, genreController.createGenre);
router.put('/:id', authMiddleware, genreController.updateGenre);
router.delete('/:id', authMiddleware, genreController.deleteGenre);

module.exports = router;
