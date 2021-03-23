const data = require('./drinksAPI.json');

const json = [];

const drinks = data.drinks;
const fs = require('fs');

drinks.forEach((dis) => {
  const ingredients = ['Ingredients: '];
  const name = JSON.stringify(dis.strDrink);
  const thumbnail = JSON.stringify(dis.strDrinkThumb);
  let i;

  for (i = 1; i < 16; i++) {
    let ingredient = '';
    const partName = `strIngredient${i}`;
    const partition = `strMeasure${i}`;
    if (dis[partName] !== null) {
      ingredient += `${i}. ${dis[partName]}`;
    }
    if (dis[partition] !== null) {
      ingredient += ` ${dis[partition]}`;
    }
    if (ingredient !== '') {
      ingredients.push(ingredient);
    }
  }

  const drink = { 'drinkName': name, 'drinkIngredients': ingredients, 'drinkThumb': thumbnail };
  json.push(drink);
});

console.log(json);
fs.writeFileSync('drinks.json', JSON.stringify(json));
