const express = require('express');
const { getComments, addComment, deleteComment } = require('../../controllers/comments/comments.controller');

const router = express.Router();

router.get('/:id', getComments);
router.post('/', addComment);
router.delete('/:id', deleteComment);

module.exports = router