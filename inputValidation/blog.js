const Joi = require('@hapi/joi');

exports.validateBlogInput = (blog) => {
    const schema = Joi.object({
        title : Joi.string(),
        content: Joi.string(),
    })
    return schema.validateAsync(blog);
}