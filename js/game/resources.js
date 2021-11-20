function createImage(src) {
    let image = new Image();
    image.src = src;
    return image;
}

let imageStrings = {
    "field": "images/field.png",
    "ship1Blue": "images/ships/ship1Blue.png",
    "ship2Blue": "images/ships/ship2Blue.png",
    "ship3Blue": "images/ships/ship3Blue.png",
    "ship4Blue": "images/ships/ship4Blue.png",
    "ship1Red": "images/ships/ship1Red.png",
    "ship2Red": "images/ships/ship2Red.png",
    "ship3Red": "images/ships/ship3Red.png",
    "ship4Red": "images/ships/ship4Red.png",

    "blueArrow": "images/blueArrow.png",
    "redArrow": "images/redArrow.png",
    "missed": "images/missed.png",
    "explosion": "images/explosion.png",
}

let IsLoaded = false;
let Images = {};

function loadImages() {
    let imageKeys = Object.keys(imageStrings);
    function loadImage(index) {
        let imageKey = imageKeys[index];
        let imageValue = imageStrings[imageKeys[index]];
        let image = new Image();
        image.src = imageValue;
        image.onload = () => {
            Images[imageKey] = image;
            if (index + 1 < imageKeys.length) {
                loadImage(index + 1);
            }
            else {
                IsLoaded = true;
            }
        };
    }
    loadImage(0);
}