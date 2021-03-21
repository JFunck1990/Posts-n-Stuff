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
  /* router.get('/food', function (req, res) {
    if (req.isAuthenticated()) {
      db.Post.findAll({ where: { category: 'Food' } }).then((dbPost) => {
        const hbsObject = {
          post: dbPost
        };
        res.render('food', hbsObject);
      });
    } else {
      res.redirect('/');
    }
  }); */

  router.get('/food', (req, res) => {
    if (req.isAuthenticated()) {
      const user = {
        user: req.session.passport.user,
        isloggedin: req.isAuthenticated()
      };
      res.render('food', user);
    } else {
      res.render('food');
    }
  });

  /* router.get('/drinks', function (req, res) {
    if (req.isAuthenticated()) {
      db.Post.findAll({ where: { category: 'Drinks' } }).then((dbPost) => {
        const hbsObject = {
          post: dbPost
        };
        res.render('drinks', hbsObject);
      });
    } else {
      res.redirect('/');
    }
  }); */

  router.get('/drinks', (req, res) => {
    if (req.isAuthenticated()) {
      const user = {
        user: req.session.passport.user,
        isloggedin: req.isAuthenticated()
      };
      res.render('drinks', user);
    } else {
      res.render('drinks');
    }
  });

  /* router.get('/diy', function (req, res) {
    if (req.isAuthenticated()) {
      db.Post.findAll({ where: { category: 'DIY' } }).then((dbPost) => {
        const hbsObject = {
          post: dbPost
        };
        res.render('diy', hbsObject);
      });
    } else {
      res.redirect('/');
    }
  }); */

  router.get('/diy', (req, res) => {
    if (req.isAuthenticated()) {
      const user = {
        user: req.session.passport.user,
        isloggedin: req.isAuthenticated()
      };
      res.render('diy', user);
    } else {
      res.render('diy');
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
