const { NODE_ENV, JWT_SECRET } = process.env;
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const ConflictError = require('../errors/conflictError');

module.exports.userInfo = (req, res, next) => { // возвращает информацию о пользователе
  User.findById(req.user._id)
    .then((user) => res.send({ data: user }))
    .catch(next);
};
module.exports.createUser = (req, res, next) => { // создание пользователя
  const { name, email } = req.body;
  bcrypt.hash(req.body.password, 10)
    .then((hash) => User.create({ name, email, password: hash }))
    .then((user) => {
      res.send({ data: user.omitPrivate() });
    })
    .catch(next);
};

module.exports.createUser = (req, res, next) => { // создание пользователя
  const { name, email } = req.body;
  User.find({ email })
    .then((data) => {
      if (data.length === 1) {
        return Promise.reject(new ConflictError('Адрес электронной почты уже используется'));
      }
      res.set('Access-Control-Allow-Origin', 'http://localhost:8080');
      res.set('Access-Control-Allow-Credentials', 'true');
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
      res.send({
        token: jwt.sign({ _id: user._id }, NODE_ENV === 'production' ? JWT_SECRET : 'x0oXkWVDk6ekqwspPTWkM5hilCpsAuAW', { expiresIn: '7d' }),
      });
    })
    .catch(next);
};
