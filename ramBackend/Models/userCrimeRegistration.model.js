const { Joi } = require("celebrate");

module.exports = {
  body: Joi.object().keys({
    type:Joi.string().required(),
    date:Joi.string().required(),
    suspects:Joi.string().allow(''),
    details:Joi.string().allow('')
  })
};
