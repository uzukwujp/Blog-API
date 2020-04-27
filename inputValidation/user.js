const Joi = require('@hapi/joi');

exports. validateUserInput = (user)=>{
    const schema = Joi.object({
        userName: Joi.string(),
        password: Joi.string(),
        phone: Joi.number(),
        isAdmin: Joi.boolean(),
        email: Joi.string().email({minDomainSegments: 2, tlds: {allow: 'com'}})
    })

    return schema.validateAsync(user);
}
    