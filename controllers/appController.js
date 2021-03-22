module.exports = function (db) {
  return {
    // Get all Posts
    getPostsByCategory: (req, res) => {
      db.Post.findAll({ where: { category: req.params.category } }).then((dbPost) => {
        res.json(dbPost);
      });
    },
    // Create a new Post
    createPost: (req, res) => {
      db.Post.create(req.body).then((dbPost) => {
        res.json(dbPost);
      });
    },
    // Delete an Post by id
    deletePost: (req, res) => {
      db.Post.destroy({ where: { id: req.params.id } }).then((dbPost) => {
        res.json(dbPost);
      });
    },

    getPostByTitle: (req, res) => {
      db.Post.findAll({ where: { title: req.params.title } }).then((dbPost) => {
        res.json(dbPost);
      });
    },

    updatePostContent: (req, res) => {
      db.Post.update({ title: req.body, body: req.body.body }, { where: { id: req.params.id } }).then((dbPost) => {
        res.json(dbPost);
      });
    },

    updateLikes: (req, res) => {
      db.Post.update({ likes: req.body }, { where: { id: req.params.id } }).then((dbPost) => {
        res.json(dbPost);
      });
    },

    updateDislikes: (req, res) => {
      db.Post.update({ dislikes: req.body }, { where: { id: req.params.id } }).then((dbPost) => {
        res.json(dbPost);
      });
    }
  };
};

// { where: { UserId: req.session.passport.user.id } }
