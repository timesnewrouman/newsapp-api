const { Joi } = require('celebrate');

module.exports = {
  params: Joi.object().keys({
    id: Joi.string().alphanum().length(24),
  }).unknown(true),
};
