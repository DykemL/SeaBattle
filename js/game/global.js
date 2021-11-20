let Height = 969;
let Width = 1920;

let Canvas = document.getElementById("canvas");
Canvas.style.height = Height + "px";
Canvas.style.width = Width + "px";

let GameOverPanel = document.getElementById("gameOverPanel");
let GameOverMessage = document.getElementById("gameGameMessage");

let Ctx = Canvas.getContext("2d");

let CellsCount = 10;
let FieldMarginTop = 200;
let FieldMarginSide = 500;

let CellSize = 32;
let InnerCellSize = 30;

let GlobalGame;//для доступа к игре из отладчика