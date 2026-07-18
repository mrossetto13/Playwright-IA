const testData = require('../data/test-data.json');

const urls = {
  base: 'https://www.saucedemo.com',
  inventory: '/inventory.html',
  cart: '/cart.html',
};

module.exports = {
  users: testData.usuarios,
  urls,
};
