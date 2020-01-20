const { Joi } = require("celebrate");

module.exports.body = Joi.object().keys({
    newOfficer: Joi.string().required(),
    caseNo: Joi.number().required()
})


