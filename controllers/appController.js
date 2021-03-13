module.exports = function (db) {
  return {
    // Get all Posts
    getPosts: (req, res) => {
      db.Post.findAll().then((dbPost) {
        res.json(dbPost);
      });
    },
    // Create a new Post
    createPost: (req, res) => {
      db.Post.create(req.body).then((dbPost) {
        res.json(dbPost);
      });
    },
    // Delete an Post by id
    deletePost: (req, res) => {
      db.Post.destroy({ where: { id: req.params.id } }).then((dbPost) {
        res.json(dbPost);
      });
    },

    getPostByTitle: (req, res) => {
      db.Post.findAll({ where: {title: req.params.title } }).then((dbPost) {
        res.json(dbPost)
      })
    },

    updatePostContent: (req, res) => {
      db.Post.update({title: req.body.title, body: req.body.body}, { where: {id: req.params.id}}).then((dbPost) => {
        res.json(dbPost);
      })
    },

    updateLikes: (req, res) => {
      db.Post.update({likes: req.body.likes}, { where: { id: req.params.id }}).then((dbPost) => {
        res.json(dbPost);
      })
    },

    updateDislikes: (req, res) => {
      db.Post.update({dislikes: req.body.dislikes}, { where: { id: req.params.id }}).then((dbPost) => {
        res.json(dbPost);
      })
    }
  };
};

// { where: { UserId: req.session.passport.user.id } }
