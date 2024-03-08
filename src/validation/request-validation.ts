const { celebrate, Joi } = require('celebrate');

export const emailRegexp = /^[A-Z0-9._%+-]+@[A-Z0-9-]+.+.[A-Z]{2,4}$/i;
export const linkRegexp = /^(http|https):\/\/(www\.)?[a-zA-Z0-9-._~:/?#[\]\\@!$&'()*+,;=]+\/?/;

export const registrationValidation = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().pattern(emailRegexp),
    password: Joi.string().required(),
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(200),
    avatar: Joi.string().pattern(linkRegexp),
  }),
});

export const loginValidation = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().pattern(emailRegexp),
    password: Joi.string().required(),
  }),
});

export const postCardValidation = celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    link: Joi.string().required().pattern(linkRegexp),
  }),
});

export const userIdValidation = celebrate({
  params: Joi.object().keys({
    userId: Joi.string().required().hex().length(24),
  }),
});

export const cardIdValidation = celebrate({
  params: Joi.object().keys({
    cardId: Joi.string().required().hex().length(24),
  }),
});

export const updateUserValidation = celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    about: Joi.string().required().min(2).max(200),
  }),
});

export const updateAvatarValidation = celebrate({
  body: Joi.object().keys({
    avatar: Joi.string().required().pattern(linkRegexp),
  }),
});
