const router = require('express').Router();

module.exports = (db) => {
  // Load register page
  router.get('/register', (req, res) => {
    if (req.isAuthenticated()) {
      res.redirect('/profile');
    } else {
      res.render('register');
    }
  });

  // Load profile page
  router.get('/profile', (req, res) => {
    if (req.isAuthenticated()) {
      db.User.findOne({
        where: {
          id: req.session.passport.user.id
        }
      }).then(() => {
        const user = {
          userInfo: req.session.passport.user,
          isloggedin: req.isAuthenticated()
        };
        // console.log(user);
        res.render('profile', user);
      });
    } else {
      res.redirect('/');
    }
  });

  // Load home page bofore login
  router.get('/', (req, res) => {
    if (req.isAuthenticated()) {
      const user = {
        user: req.session.passport.user,
        isloggedin: req.isAuthenticated()
      };
      res.render('home', user);
    } else {
      res.render('home');
    }
  });

  // Load home page
  router.get('/home', (req, res) => {
    if (req.isAuthenticated()) {
      const user = {
        user: req.session.passport.user,
        isloggedin: req.isAuthenticated()
      };
      res.render('home', user);
    } else {
      res.render('home');
    }
  });

  // Load example index page
  router.get('/food', function (req, res) {
    if (req.isAuthenticated()) {
      db.Posts.findAll({ where: { category: 'Food' } }).then((dbPost) => {
        dbPost.forEach((post) => {
          post.dataValues.body = post.dataValues.body.split('\n');
          post.dataValues.date = post.dataValues.date.toString().split(' ').slice(0, 4).join(' ');
        });

        const hbsObject = {
          category: 'Food',
          post: dbPost,
          userInfo: req.session.passport.user,
          isloggedin: req.isAuthenticated(),
          userFirstname: req.session.passport.user.firstName,
          userLastname: req.session.passport.user.lastName,
          userId: req.session.passport.user.id
        };
        res.render('drinks', hbsObject);
      });
    } else {
      res.redirect('/');
    }
  });

  router.get('/drinks', function (req, res) {
    if (req.isAuthenticated()) {
      db.Posts.findAll({ where: { category: 'Drinks' } }).then((dbPost) => {
        dbPost.forEach((post) => {
          post.dataValues.body = post.dataValues.body.split('\n');
          post.dataValues.date = post.dataValues.date.toString().split(' ').slice(0, 4).join(' ');
        });

        const hbsObject = {
          category: 'Drinks',
          post: dbPost,
          userInfo: req.session.passport.user,
          isloggedin: req.isAuthenticated(),
          userFirstname: req.session.passport.user.firstName,
          userLastname: req.session.passport.user.lastName,
          userId: req.session.passport.user.id
        };
        // console.log('--------------------------------');
        // console.log(hbsObject.post[0].dataValues.image.split('"')[1]);
        // console.log('--------------------------------');
        res.render('drinks', hbsObject);
      });
    } else {
      res.redirect('/');
    }
  });

  router.get('/diy', function (req, res) {
    if (req.isAuthenticated()) {
      db.Posts.findAll({ where: { category: 'DIY' } }).then((dbPost) => {
        dbPost.forEach((post) => {
          post.dataValues.body = post.dataValues.body.split('\n');
          post.dataValues.date = post.dataValues.date.toString().split(' ').slice(0, 4).join(' ');
        });

        const hbsObject = {
          category: 'DIY',
          post: dbPost,
          userInfo: req.session.passport.user,
          isloggedin: req.isAuthenticated(),
          userFirstname: req.session.passport.user.firstName,
          userLastname: req.session.passport.user.lastName,
          userId: req.session.passport.user.id
        };
        res.render('drinks', hbsObject);
      });
    } else {
      res.redirect('/');
    }
  });

  // Load example page and pass in an example by id
  router.get('/example/:id', function (req, res) {
    if (req.isAuthenticated()) {
      db.Example.findOne({ where: { id: req.params.id }, raw: true }).then(function (dbExample) {
        res.render('example-detail', {
          userInfo: req.session.passport.user,
          isloggedin: req.isAuthenticated(),
          example: dbExample
        });
      });
    } else {
      res.redirect('/');
    }
  });
  // login
  router.get('/login', (req, res) => {
    // If the user already has an account send them to the members page
    if (req.isAuthenticated()) {
      res.redirect('/');
    } else {
      res.redirect('/login');
    }
  });

  // Logout
  router.get('/logout', (req, res, next) => {
    req.logout();
    req.session.destroy((err) => {
      if (err) {
        return next(err);
      }
      res.clearCookie('connect.sid', { path: '/' });
      res.redirect('/');
    });
  });

  // Render 404 page for any unmatched routes
  router.get('*', function (req, res) {
    res.render('404');
  });

  return router;
};
