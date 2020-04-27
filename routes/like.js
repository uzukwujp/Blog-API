const likeController = require('../controllers/like');
const express = require('express');
const router = express.Router();


router.post('/', likeController.createLike);
module.exports = router