const db = require('../models');
const foods = require('./foods.json');
const drinks = require('./drinks.json');

db.sequelize.sync().then(() => {
  db.User.create({
    firstName: 'Cocktail',
    lastName: 'DB',
    email: 'cocktaildb@gmail.com',
    password: '1234',
    isAdmin: true
  }).then(() => {
    drinks.forEach((cocktail) => {
      let drinkBody = '';

      cocktail.drinkIngredients.forEach(list => {
        drinkBody += `${list} \n `;
      });

      db.Posts.create({
        title: cocktail.drinkName,
        author: 'The Cocktail DB',
        image: cocktail.drinkThumb,
        date: '03/17/2021',
        category: 'Drinks',
        body: drinkBody,
        likes: 0,
        dislikes: 0,
        UserId: 1
      });
    });
  }).then(() => {
    db.User.create({
      firstName: 'Meal',
      lastName: 'DB',
      email: 'mealdb@gmail.com',
      password: '1234',
      isAdmin: true
    }).then(() => {
      foods.forEach(recipe => {
        let foodBody = '';

        recipe.mealIngredients.forEach(list => {
          foodBody += `${list} \n `;
        });

        foodBody += recipe.mealInstructions;
        foodBody += `SOURCE: ${recipe.mealSource}`;

        db.Posts.create({
          title: recipe.mealName,
          author: 'The Meal DB',
          image: recipe.mealThumb,
          category: 'Food',
          date: '03/17/2021',
          body: foodBody,
          likes: 0,
          dislikes: 0,
          UserId: 2
        });
      });
    });
  });
});
