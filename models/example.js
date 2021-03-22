module.exports = function (sequelize, DataTypes) {
  const Posts = sequelize.define('Posts', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    title: DataTypes.STRING,
    author: DataTypes.STRING,
    image: DataTypes.STRING,
    category: DataTypes.STRING,
    date: DataTypes.DATE,
    body: DataTypes.STRING(5000),
    likes: {
      type: DataTypes.INTEGER,
      defaultValue: 0
    },
    dislikes: {
      type: DataTypes.INTEGER,
      defaultValue: 0
    }
  });

  Posts.associate = function (models) {
    Posts.belongsTo(models.User, {
      foreignKey: {
        allowNull: false
      }
    });
  };

  return Posts;
};
