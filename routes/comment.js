const commentController = require('../controllers/comment');
const express = require('express');
const router = express.Router();



router.post('/',  commentController.createComment);
module.exports = router;