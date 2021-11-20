let Canvas = document.getElementById("canvas");
let Ctx = Canvas.getContext("2d");

let FieldSize = 10;
let FieldMarginTop = 200;
let FieldMarginSide = 500;

let CellSize = 32;
let InnerCellSize = 30;

function getRandomInRange(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}