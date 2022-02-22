const fs = require('fs');
const path = require('path');

function readFile(file) {
  return fs.readFileSync(path.join(__dirname, `../${file}`), 'utf8');
}

class Ingredient {

    id;
    dislike;

    constructor(id, dislike) {
        this.id = id;
        this.dislike = dislike;
    }
}

class Customer {
    
    likes;
    dislikes;

    constructor(likes, dislikes) {
        this.likes = likes;
        this.dislikes = dislikes;
    }
}

function read(file) {
  const data = readFile(file);

  const lines = data.split('\n');
  lines.shift();

  const customers = [];

  for (let i = 0; i < lines.length; i = i + 2) {
    const likes = lines[i].split(' ');
    likes.shift();

    const dislikes = lines[i + 1].split(' ');
    dislikes.shift();

    const newCustomer = new Customer(likes, dislikes);

    customers.push(newCustomer);
  }

  return customers;
}

module.exports = {
  read,
  Customer,
  Ingredient,
};
