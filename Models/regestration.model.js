const { Joi } = require("celebrate");

module.exports = {
  body: {
    name: Joi.string().required(),
    password: Joi.string().required(),
    username: Joi.string().required(),
    city: Joi.string().required(),
    userType:Joi.string().required(),
    phone:Joi.number().required()
  },

};
