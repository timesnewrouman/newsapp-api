const router = require('express').Router();
const { celebrate } = require('celebrate');
const { getArticles, postArticle, deleteArticle } = require('../controllers/articles');
const postArticleSchema = require('../validationSchemas/postArticle');
const deleteArticleSchema = require('../validationSchemas/deleteArticle');

router.get('/', getArticles);
router.post('/', celebrate(postArticleSchema), postArticle);
router.delete('/:articleId', celebrate(deleteArticleSchema), deleteArticle);

module.exports = router;
