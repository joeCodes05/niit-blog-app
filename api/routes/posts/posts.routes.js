const express = require('express');
const { getPosts, getSinglePost, addPost, editPost, deletePost } = require('../../controllers/posts/post.controller');

const router = express.Router();

router.get('/', getPosts);
router.get('/:id', getSinglePost);
router.post('/', addPost);
router.delete('/:id', deletePost);
router.put('/:id', editPost);

module.exports = router;