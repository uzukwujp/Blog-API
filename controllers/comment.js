const {Blog,Comment, Like} = require('../models/blog');
const validate = require('../inputValidation/comment');


exports.createComment = (req,res,next)=>{
    // validate the input
    validate.validateCommentInput(req.body)
    .then((result)=>{
        // check if the blog exist
        Blog.findById({_id: result.blog_Id})
        .then((blog)=>{
            //update create the commnet
            blog.comments.push({author:result.author, comment:result.comment});
            blog.save()
            .then((blog)=>{
                res.json(200).json({"message": "successfully created a comment"})
            })
            .catch((error)=>{
                res.status(500).json({"error": error})
            })
        })
        .catch((error)=>{
            res.status(400).json({"error": error})
        })
    })
    .catch((error)=>{
        res.status(400).json({"error": error})
    })
};