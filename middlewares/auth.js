const jwt = require('jsonwebtoken');
const WrongToken = require('../errors/wrongToken');
const NotHeaders = require('../errors/notHeaders');
const { JWT_SECRET } = require('../config');
const { authRequired, wrongToken } = require('../const');

const auth = (req, res, next) => {
  const cookie = req.cookies.jwt;
  if (!cookie) {
    throw new NotHeaders(authRequired);
  }
  const token = cookie;
  let payload;

  try {
    payload = jwt.verify(token, JWT_SECRET);
  } catch (err) {
    throw new WrongToken(wrongToken);
  }
  req.user = payload;
  return next();
};

module.exports = { auth };
