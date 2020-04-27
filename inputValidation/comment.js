const Joi = require('@hapi/joi');

exports.validateCommentInput = (comment)=>{
    const schema = Joi.object({
        blog_Id : Joi.string(),
        author: Joi.string(),
        comment: Joi.string()
    })

return schema.validateAsync(comment)
};