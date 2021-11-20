let Canvas = document.getElementById("canvas");
let GameOverPanel = document.getElementById("gameOverPanel");
let GameOverMessage = document.getElementById("gameGameMessage");

let Ctx = Canvas.getContext("2d");

let CellsCount = 10;
let FieldMarginTop = 200;
let FieldMarginSide = 500;

let CellSize = 32;
let InnerCellSize = 30;