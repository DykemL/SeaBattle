function resize()
{
	Canvas.width = 1920;
	Canvas.height = 969;
}

function update()
{
	resize();
}

function waitForLoad() {
	if (IsLoaded == false) {
	   window.setTimeout(waitForLoad, 1);
	}
	else {
		main();
	}
}

window.onload = () => {
	loadImages(Images);
	waitForLoad();
}

function main() {
	resize();

	ShipFactory.init();
	GlobalGame = new Game();
	GlobalGame.inititalizeGame();
}