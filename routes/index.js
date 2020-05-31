const router = require('express').Router();
const users = require('./users');
const articles = require('./articles');

router.use('/articles', articles);
router.use('/users', users);

module.exports = router;
