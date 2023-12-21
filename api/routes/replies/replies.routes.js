const express = require("express");
const { getReplies, addReply, deleteReplies } = require('../../controllers/replies/replies.controller')

const router = express.Router();

router.get('/:id', getReplies);
router.post('/', addReply);
router.delete('/:id', deleteReplies);

module.exports = router