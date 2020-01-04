const { Joi } = require("celebrate");

module.exports.body = Joi.object().keys({
    password: Joi.string().required(),
    username: Joi.string().required()
})


