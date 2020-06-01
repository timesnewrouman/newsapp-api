const { Joi } = require('celebrate');

const repExp = /(http:\/\/|https:\/\/)(www\.)?(\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}|(\w|-)+\.(\w|-)+(\.(\w|-))?)(:\d{1,5})?[a-zA-Z0-9/_-]+#?(\.\w+)?/im;

module.exports = {
  body: Joi.object().keys({
    keyword: Joi.string().required(),
    title: Joi.string().required(),
    text: Joi.string().required(),
    date: Joi.string().required(),
    source: Joi.string().required(),
    image: Joi.string().required().regex(repExp),
    link: Joi.string().required().regex(repExp),
  }),
};
