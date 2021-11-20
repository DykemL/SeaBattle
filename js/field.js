class Field {
    image;
    x;
    y;
    startPadding;

    alignment;
    field;
    ships;
    pointsField;

    constructor(x, y, alignment) {
        this.image = Images['field'];
        this.x = x;
        this.y = y;
        this.startPadding = CellSize;
        this.alignment = alignment;
        this._clearField();
    }

    initialize() {
        this._initRandom();
    }

    draw() {
        Ctx.drawImage(this.image, this.x, this.y);
    }

    drawShips() {
        for (let ship of this.ships) {
            let placementCoords = this._toPlacementCoords(ship.a, ship.b);
            ship.draw(placementCoords.x, placementCoords.y);
        }
    }

    isIntersect(x, y) {
        let isXIntersect = x - this.x >= 0 && this.x + (CellSize) * FieldSize - x >= 0;
        let isYIntersect = y - this.y >= 0 && this.y + (CellSize) * FieldSize - y >= 0;
        return isXIntersect && isYIntersect;
    }

    receiveAttack(x, y) {
        let localCoords = this._toFieldCoords(x, y);
        let placementCoords = this._toPlacementCoords(localCoords.x, localCoords.y);
        Ctx.drawImage(Images['explosion'], placementCoords.x, placementCoords.y);
    }

    _toFieldCoords(x, y) {
        let spacing = CellSize - 1;
        let xOffset = x - this.x - spacing;
        let yOffset = y - this.y - spacing;
        let aCoord = (xOffset - (xOffset % spacing)) / spacing;
        let bCoord = (yOffset - (yOffset % spacing)) / spacing;
        return new Vector(aCoord, bCoord);
    }

    _toPlacementCoords(a, b) {
        return new Vector(this.x + this.startPadding + (CellSize - 1) * a, this.y + this.startPadding + (CellSize - 1) * b);
    }

    _clearField() {
        this.field = new Array(FieldSize);
        for (let i = 0; i < FieldSize; i++) {
            this.field[i] = new Array(FieldSize);
        }

        this.pointsField = new Array(FieldSize);
        for (let i = 0; i < FieldSize; i++) {
            this.pointsField[i] = new Array(FieldSize);
        }
    }

    _updatePointsField() {
        let pointsField = this.pointsField;
        function calculateShip(i, j, ship, vector) {
            let points = Vector.getPointsTo(new Vector(i, j), vector);
            for (let point of points) {
                pointsField[point.x][point.y] = ship;
            }
        }
        for (let i = 0; i < FieldSize; i++) {
            for (let j = 0; j < FieldSize; j++) {
                if (this.field[i][j] != undefined) {
                    let ship = this.field[i][j];
                    let directionVector = toVector(ship.direction, ship.size);
                    calculateShip(i, j, ship, directionVector);
                }
            }
        }
    }

    _initRandom() {
        if (this.alignment == Alignment.Blue) {
            this.ships = ShipFactory.getBlueSide();
        }
        else if (this.alignment == Alignment.Red) {
            this.ships = ShipFactory.getRedSide();
        }
        for (let ship of this.ships) {
            ship.direction = getRandomDirection();
            let validPoints = this._getAvailablePoints(ship);
            if (validPoints.length == 0) {
                console.log("Нет свободных полей");
                this._clearField();
                this._initRandom();
                return;
            }
            let randomPointIndex = getRandomInRange(0, validPoints.length - 1);
            let randomValidPoint = validPoints[randomPointIndex];
            let a = randomValidPoint.x;
            let b = randomValidPoint.y;
            ship.a = a;
            ship.b = b;
            this.field[ship.a][ship.b] = ship;
            this._updatePointsField();
        }
    }

    _getAvailablePoints(ship) {
        let pointsField = this.pointsField;
        function checkCoord(i, j) {
            if (!Vector.isValidPoint(new Vector(i, j))) {
                return true;
            }
            return pointsField[i][j] == undefined;
        }
        function checkAround(i, j) {
            return checkCoord(i - 1, j) && checkCoord(i - 1, j - 1) && checkCoord(i, j - 1) && checkCoord(i + 1, j - 1)
            && checkCoord(i + 1, j) && checkCoord(i + 1, j + 1) && checkCoord(i, j + 1) && checkCoord(i - 1, j + 1);
        }
        function checkForShipPlacement(i, j) {
            let endPoint = toVector(ship.direction, ship.size);
            let points = Vector.getPointsTo(new Vector(i, j), endPoint);
            for (let point of points) {
                if (!Vector.isValidPoint(point)) {
                    return false;
                }
                let currentPointIsValid = pointsField[point.x][point.y] == undefined;
                let aroundIsValid = checkAround(point.x, point.y)
                if (!currentPointIsValid || !aroundIsValid) {
                    return false;
                }
            }
            return true;
        }
        let points = []
        for (let i = 0; i < FieldSize; i++) {
            for (let j = 0; j < FieldSize; j++) {
                if (checkForShipPlacement(i, j)){
                    points.push(new Vector(i, j));
                }
            }
        }
        return points;
    }
}