const {Blog,Comment, Like} = require('../models/blog');
const validate = require('../inputValidation/like');


exports.createLike = (req,res,next)=>{
    // validate the input
    validate.validateLikeInput(req.body)
    .then((result)=>{
        // check if the blog exist
        Blog.findById({_id: result.blog_Id})
        .then((blog)=>{
            //update create the commnet
            blog.likes.push({like: result.like});
            blog.save()
            .then((blog)=>{
                res.json(201).json({"message": "successfully liked the blog", blog})
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