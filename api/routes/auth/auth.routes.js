const { createUsers, loginUser, logoutUser } = require('../../controllers/auth/auth.controller');
const express = require('express');

const router = express.Router();

router.post('/signup', createUsers);
router.post('/login', loginUser);
router.post('/logout', logoutUser);

module.exports = router;