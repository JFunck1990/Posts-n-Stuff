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
      db.Posts.update({ title: req.body, body: req.body.body }, `id = ${req.params.id}`, (result) => {
        if (result.changedRows === 0) {
          // If no rows were changed, then the ID must not exist, so 404
          return res.status(404).end();
        }
        res.status(200).end();
      }).then((dbPost) => {
        res.json(dbPost);
      });
    },

    updateLikes: (req, res) => {
      db.Posts.update({ likes: req.body.numLikes }, { where: { id: req.params.id } }, (result) => {
        if (result.changedRows === 0) {
          // If no rows were changed, then the ID must not exist, so 404
          return res.status(404).end();
        }
        res.status(200).end();
      }).then((dbPost) => {
        res.json(dbPost);
      });
    },

    updateDislikes: (req, res) => {
      console.log(req.params.id);
      db.Posts.update({ dislikes: req.body.numDislikes }, { where: { id: req.params.id } }, (result) => {
        if (result.changedRows === 0) {
          // If no rows were changed, then the ID must not exist, so 404
          return res.status(404).end();
        }
        res.status(200).end();
      }).then((dbPost) => {
        res.json(dbPost);
      });
    }
  };
};
