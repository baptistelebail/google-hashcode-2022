const { readFile } = require("./utils/parser");

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

const a = readFile('/score/a_an_example.in.txt');
console.log(a);