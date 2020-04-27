
const express = require('express');
const router = express.Router();
const blogController = require('../controllers/blog');
const multer = require('../middlware/multer-config');
const auth = require('../middlware/auth');
const adminMiddleware = require('../middlware/admin');


router.post('/', auth, adminMiddleware, multer, blogController.createBlog);

router.get('/', auth, blogController.getAllBlog);

router.get('/:id', auth , blogController.getOneBlog);

router.put('/:id', auth, adminMiddleware, multer, blogController.modifyBlog)

router.delete('/:id', auth, adminMiddleware, blogController.deleteBlog)


module.exports = router;
