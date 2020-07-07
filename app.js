require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const { celebrate } = require('celebrate');
const { errors } = require('celebrate');
const { login, createUser } = require('./controllers/users');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const { auth } = require('./middlewares/auth');
const { deleteCookie } = require('./middlewares/deleteCookie');
const { PORT, DATABASE_URL } = require('./config');
const createUserSchema = require('./validationSchemas/createUser');
const loginSchema = require('./validationSchemas/login');

const allowedList = [
  'http://localhost:8080',
  'https://timesnewrouman.github.io',
  'https://www.timesnewrouman.github.io',
  'https://www.newsapp.gq',
  'https://newsapp.gq',
  'http://www.newsapp.gq',
  'http://newsapp.gq',
];

const corsOptions = {
  origin: (origin, callback) => {
    if (allowedList.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
};

mongoose.connect(DATABASE_URL, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
  useUnifiedTopology: true,
});

const app = express();
app.use(cookieParser());
app.use(cors(corsOptions));

app.use(cookieParser());
app.use(bodyParser.json());

app.use(cookieParser());
app.use(requestLogger);
app.post('/signup', celebrate(createUserSchema), createUser);
app.post('/signin', celebrate(loginSchema), login);

app.use(cookieParser());

app.use(auth);
app.use('/', require('./routes/index'));

app.delete('/deletecookie', auth, deleteCookie);

app.use(errorLogger);
app.use(errors());

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});

app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = statusCode === 500 ? 'Произошла ошибка' : err.message;
  res.status(statusCode).send({ message });
});
