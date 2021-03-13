module.exports = function (sequelize, DataTypes) {
  const Post = sequelize.define('Post', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
  },
  title: DataTypes.STRING,
  author: DataTypes.STRING,
  date: DataTypes.DATE,
  body: DataTypes.STRING,
  likes: DataTypes.INTEGER,
  dislikes: DataTypes.INTEGER
  });

  Post.associate = function (models) {
    Post.belongsTo(models.User, {
      foreignKey: {
        allowNull: false
      }
    });
  };

  return Post;
};
