const{Blog, Comment , Like } = require('../models/blog');
const validate = require('../inputValidation/blog');
const fs = require('fs');

exports.createBlog = (req,res,next)=>{
    req.body.blog = JSON.parse(req.body.blog);
    console.log(req.body.blog)

    validate.validateBlogInput(req.body.blog)
    .then((result)=>{
        const url = req.protocol + "://" + req.get('host');
        const blog = new Blog({
            title: result.title,
            content: result.content,
            imageUrl: url + '/images/'+ req.file.filename
        });
        blog.save()
        .then((blog)=>{
            res.status(201).json({"message":'blog succesfully created', "blog": blog})
        })
        .catch((error)=>{
            res.status(400).json({"error": error})
        }) 

    })
    .catch((error)=>{
        res.status(400).json({"error": error})
    })
    
};


exports.getAllBlog =  (req,res,next)=>{
    
    const currentPage = Number(req.query.page)|| 1;
    const perPage = 2;
    const totalDocument;
    Blog.countDocuments()
    .then((count)=>{
        totalDocument = count;
        return Blog.find()
        .skip((currentPage - 1)* perPage)
    })
    .then((blogs)=>{
        res.status(200).json({"blogs": blogs, "totalDocuments": totalDocument})
    })
    .catch((error)=>{
        res.status(400).json({"error": error})
    })
};

exports.getOneBlog = (req,res,next)=>{
    Blog.findOne({_id: req.params.id})
    .then((blog)=>{
        res.status(200).json({"blog": blog})
    })
    .catch((error)=>{
        res.status(400).json({"error": error})
    })
};  


exports. modifyBlog = (req,res,next)=>{
    const blog = new Blog({_id: req.params.id});
    const url = req.protocol + '://' + req.get('host');
    if(req.file){
    blog = {
        _id : req.params.id,
        title: req.body.title,
        content: req.body.content,
        imageUrl: url+'/images/'+req.file.filename
    }
}else{
    blog = {
        _id: req.params.id,
        title: req.body.title,
        content: req.body.content,
        imageUrl:req.body.imageUrl
    }

}
    blog.updateOne({_id: req.params.id}, blog)
    .then((blog)=>{
        res.status(200).json({"message": "blog successfully updated", "blog": blog})
    })
    .catch((error)=>{
        res.status(400).json({"error": error})
    })
};

exports.deleteBlog =   (req,res,next)=>{

    Blog.findOne({_id:req.params.id})
    .then((blog)=>{
        const filename = blog.imageUrl.split('/images/')[1];
        fs.unlink('images/'+ filename, ()=>{
        Blog.deleteOne({_id: req.params.id})
    .then(()=>{
        res.status(200).json({"message": "blog successfully deleted"})
    })
    .catch((error)=>{
        res.status(400).json({"error":error})
    })

        })
    })
    
};

