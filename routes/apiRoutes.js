const router = require('express').Router();
const ensureAuthenticated = require('../middlewares/ensureAuthenticated');

module.exports = (passport, db) => {
  const AuthController = require('../controllers/authController')(passport, db);
  const AppController = require('../controllers/appController')(db);

  // Authentication
  router.post('/register', AuthController.register);
  router.post('/login', AuthController.login);
  router.get('/logout', AuthController.logout);
  router.put('/user/:id', ensureAuthenticated, AuthController.updateUser);
  router.delete('/user/:id', ensureAuthenticated, AuthController.deleteUser);
  router.post('/user/confirm', AuthController.confirmAuth);

  // Post functions
  router.get('/post/:category', AppController.getPostsByCategory);
  router.get('/post/:title', AppController.getPostByTitle);
  router.post('/post', AppController.createPost);
  router.delete('/post/:id', AppController.deletePost);
  router.put('/post/:id', AppController.updatePostContent);
  router.put('/post/likes/:likes', AppController.updateLikes);
  router.put('/post/dislikes/:dislikes', AppController.updateDislikes);

  return router;
};
