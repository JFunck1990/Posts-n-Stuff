module.exports = function (db) {
  return {
    // Get all Posts
    getPostsByCategory: (req, res) => {
      db.Posts.findAll({ where: { category: req.params.category } }).then((dbPost) => {
        res.json(dbPost);
      });
    },
    // Create a new Post
    createPost: (req, res) => {
      db.Posts.create(req.body).then((dbPost) => {
        res.json(dbPost);
      });
    },
    // Delete an Post by id
    deletePost: (req, res) => {
      db.Posts.destroy({ where: { id: req.params.id } }).then((dbPost) => {
        res.json(dbPost);
      });
    },

    getPostByTitle: (req, res) => {
      db.Posts.findAll({ where: { title: req.params.title } }).then((dbPost) => {
        res.json(dbPost);
      });
    },

    updatePostContent: (req, res) => {
      db.Posts.update({ title: req.body, body: req.body.body }, { where: { id: req.params.id } }).then((dbPost) => {
        res.json(dbPost);
      });
    },

    updateLikes: (req, res) => {
      db.Posts.update({ likes: req.body }, { where: { id: req.params.id } }).then((dbPost) => {
        res.json(dbPost);
      });
    },

    updateDislikes: (req, res) => {
      db.Posts.update({ dislikes: req.body }, { where: { id: req.params.id } }).then((dbPost) => {
        res.json(dbPost);
      });
    }
  };
};

// { where: { UserId: req.session.passport.user.id } }
