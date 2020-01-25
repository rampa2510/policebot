const { Joi } = require("celebrate");

module.exports = {
  body: {
    username: Joi.string().required(),
    phone:Joi.number().required(),
    userType:Joi.string().required(),
    phone:Joi.number().required(),
    otp:Joi.number().required(),
    password:Joi.string().required(),
    name:Joi.string().required(),
    city:Joi.string().required()
  },

};
