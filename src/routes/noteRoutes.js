const express = require('express');
const router = express.Router();
const noteController = require('../controllers/noteController');
const authMiddleware = require('../middlewares/authMiddleware');

router.use(authMiddleware);

router.get('/', noteController.getNotes);
router.post('/', noteController.addNote);
router.put('/:id', noteController.editNote);      
router.delete('/:id', noteController.deleteNote);

module.exports = router;