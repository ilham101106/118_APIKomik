const express = require('express');
const router = express.Router();
const komikController = require('../controller/komikController');
const authMiddleware = require('../middleware/authMiddleware');

// Public routes
router.get('/', komikController.getAllKomik);
router.get('/:id', komikController.getKomikById);

// Protected routes (JWT Auth Required)
router.post('/', authMiddleware, komikController.createKomik);
router.put('/:id', authMiddleware, komikController.updateKomik);
router.delete('/:id', authMiddleware, komikController.deleteKomik);

module.exports = router;
