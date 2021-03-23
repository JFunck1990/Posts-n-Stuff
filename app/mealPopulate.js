const data = require('./mealsAPI.json');

const json = [];

const meals = data.meals;
const fs = require('fs');

meals.forEach((dis) => {
  const ingredients = ['Ingredients: '];
  const instructions = JSON.stringify(dis.strInstructions);
  const name = JSON.stringify(dis.strMeal);
  const thumbnail = JSON.stringify(dis.strMealThumb);
  const source = JSON.stringify(dis.strSource);
  let i;

  for (i = 1; i < 21; i++) {
    let ingredient = '';
    const partName = `strIngredient${i}`;
    const partition = `strMeasure${i}`;
    if (dis[partName] !== ' ') {
      ingredient += `${i}. ${dis[partName]}`;
      console.log(ingredient);
    }
    if (dis[partition] !== ' ') {
      ingredient += ` ${dis[partition]}`;
      console.log(ingredient);
    }
    if (ingredient !== `${i}. ` && ingredient !== `${i}.  `) {
      console.log('Success!');
      ingredients.push(ingredient);
    }
  }

  const meal = { 'mealName': name, 'mealIngredients': ingredients, 'mealInstructions': instructions, 'mealThumb': thumbnail, 'mealSource': source };

  json.push(meal);
});

console.log(json);
fs.writeFileSync('foods.json', JSON.stringify(json));
