const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { JWT_SECRET } = require('../config');
const User = require('../models/user');
const ConflictError = require('../errors/conflictError');

module.exports.userInfo = (req, res, next) => { // возвращает информацию о пользователе
  User.findById(req.user._id)
    .then((user) => res.send({ data: user }))
    .catch(next);
};

module.exports.createUser = (req, res, next) => { // создание пользователя
  const { name, email } = req.body;
  User.find({ email })
    .then((data) => {
      if (data.length === 1) {
        return Promise.reject(new ConflictError('Адрес электронной почты уже используется'));
      }
      return bcrypt.hash(req.body.password, 10)
        .then((hash) => User.create({ name, email, password: hash }))
        .then((user) => {
          res.send({ data: user.omitPrivate() });
        });
    })
    .catch(next);
};

module.exports.login = (req, res, next) => { // авторизация пользователя
  const { email, password } = req.body;

  return User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign({ _id: user._id },
        JWT_SECRET,
        { expiresIn: '7d' });
      res.cookie('jwt', token, { domain: '', httpOnly: true })
        .send({ data: user.name })
        .end();
    })
    .catch(next);
};
