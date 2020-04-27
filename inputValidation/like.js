const Joi = require('@hapi/joi');


exports. validateLikeInput = (like)=>{

    const schema = Joi.object({
        blog_Id : Joi.string(),
        like: Joi.boolean()
    })

    return schema.validateAsync(like)
}