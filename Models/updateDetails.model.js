const { Joi } = require("celebrate");

module.exports.body = Joi.object().keys({
    date: Joi.date().required(),
    details: Joi.string().required(),
    caseNo:Joi.number().required()
})


