const { Joi } = require("celebrate");

module.exports = {
  body: {
    username: Joi.string().required(),
    phone:Joi.number().required()
  },

};
