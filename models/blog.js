const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema({
    author: {type: String, required: true},
    comment: {type: String, required: true}
});
const likeSchema = new mongoose.Schema({
    like:{type: Boolean, required: true}
});

const blogSchema = mongoose.Schema({
    title: {type: String, required: true},
    content: {type: String, required: true},
    imageUrl: {type: String, required: true},
    createdAt: {type: Date, default: Date.now()},
    comments: [commentSchema],
    likes: [likeSchema]
});

const Blog = mongoose.model('Blog', blogSchema);
const Comment = mongoose.model('Comment', commentSchema);
const Like = mongoose.model('Like', likeSchema);

exports.Blog = Blog;
exports.Comment = Comment;
exports.Like = Like;
