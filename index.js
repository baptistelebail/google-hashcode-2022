
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