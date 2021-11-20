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
	fields = initializeAndDrawFields();
	initializeEvents(fields);
}

function initializeAndDrawFields() {
	let fieldBlue = new Field(FieldMarginSide, FieldMarginTop, Alignment.Blue);
	let fieldRed = new Field(Canvas.width - FieldMarginSide - Images['field'].width, FieldMarginTop, Alignment.Red);
	fieldBlue.initialize();
	fieldRed.initialize();
	drawFields([fieldBlue, fieldRed]);
	return [fieldBlue, fieldRed];
}

function drawFields(fields) {
	for (let field of fields) {
		field.draw();
		field.drawShips();
	}
}

function initializeEvents(fields) {
	Canvas.onmousedown = event => {
		let x = event.pageX;
		let y = event.pageY;
		if (fields[0].isIntersect(x, y)) {
			fields[0].receiveAttack(x, y);
			return;
		}
		if (fields[1].isIntersect(x, y)) {
			fields[1].receiveAttack(x, y);
			return;
		}
		//Ctx.drawImage(Images['explosion'], event.x, event.y);
	};
}