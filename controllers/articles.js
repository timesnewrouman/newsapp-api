const Article = require('../models/article');
const NotFoundError = require('../errors/notFoundError');
const ForbiddenError = require('../errors/forbiddenError');

module.exports.getArticles = (req, res, next) => { // получение сохраненных статей
  Article.find({ owner: req.user._id })
    .then((articles) => res.send({ data: articles }))
    .catch(next);
};

module.exports.postArticle = (req, res, next) => { // добавление статьи
  const { keyword, title, text, date, source, link, image } = req.body;
  const owner = req.user._id;
  Article.create({ keyword, title, text, date, source, link, image, owner })
    .then((article) => res.send({ data: article }))
    .catch(next);
};

module.exports.deleteArticle = (req, res, next) => { // удаление статьи
  Article.findById(req.params.articleId).select('+owner')
    .orFail(() => new NotFoundError('Статья не найдена'))
    .then((article) => {
      if (!article.owner.equals(req.user._id)) {
        return Promise.reject(new ForbiddenError('Статья добавлена не вами - удаление невозможно'));
      }
      return Article.findByIdAndRemove(req.params.articleId)
        .then((user) => res.send({ data: user }));
    })
    .catch(next);
};
