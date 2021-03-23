const fetch = require('node-fetch');

fetch(`https://www.thecocktaildb.com/api/json/v1/1/search.php?s`, {
  method: 'GET',
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json'
  }

}).then(res => res.json())
  .then(data => {
    const fs = require('fs');

    fs.writeFileSync('drinksAPI.json', JSON.stringify(data));
  })
  .catch(err => console.log(err));
