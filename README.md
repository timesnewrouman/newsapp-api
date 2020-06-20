# Yandex.Praktikum
#### Жигайков Роман
###### Дипломный проект newsapp
###### Версия 1.0.7

Backend-часть дипломного проекта по курсу веб-разработки. Api развёрнуто на облачном сервере платформы Яндекс.Облако. Создан домен, за ним закреплен публичный IP-адрес сервера. Выпущены и подключены сертификаты безопасности. К Api можно обратиться по https://api.newsapp.gq. Реализована валидация данных(@hapi/joi, celebrate), которые приходят в теле и параметрах запроса, настроена централизованная обработка ошибок и логгирование(winston), а также линтер (eslint). Взаимодействие с базой данных настроено через MongoDB. Реализовано бережное хранение пароля и секретного ключа (bcrypt, jsonwebtoken, dotenv)

Команда npm run start запускает сервер в продакшн-режиме, без хот-релоуда.
Команда npm run dev запускает сервер в режиме разработки с хот-релоудом (реализовано через nodemon).
