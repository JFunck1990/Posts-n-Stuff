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
  router.get('/Post/:category', AppController.getPostsByCategory);
  router.get('/Post/:title', AppController.getPostByTitle);
  router.post('/Post', AppController.createPost);
  router.delete('/Post/:id', AppController.deletePost);
  router.put('/Post/:id', AppController.updatePostContent);
  router.put('/Post/:likes', AppController.updateLikes);
  router.put('/Post/:dislikes', AppController.updateDislikes);

  return router;
};
