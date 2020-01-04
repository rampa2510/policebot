const { Joi } = require("celebrate");

module.exports = {
  body: Joi.object().keys({
    type:Joi.string().required(),
    date:Joi.string().required(),
    suspect:Joi.string().allow('')
  })
};
