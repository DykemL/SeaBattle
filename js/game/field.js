class Field {
    image;
    x;
    y;
    startPadding;

    alignment;
    ships;
    field;
    realField;
    effectsField;

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

    drawAll() {
        this.drawField();
        this.drawShips(GlobalGame.isDebugMode);
        this.drawEffects();
    }

    drawField() {
        Ctx.drawImage(this.image, this.x, this.y);
    }

    drawShips(isDebug = false) {
        for (let ship of this.ships) {
            if (!ship.isAlive || isDebug) {
                let placementCoords = this._toPlacementCoords(ship.a, ship.b);
                ship.draw(placementCoords.x, placementCoords.y);
            }
        }
    }

    drawEffects() {
        for (let i = 0; i < CellsCount; i++) {
            for (let j = 0; j < CellsCount; j++) {
                if (this.realField[i][j] == CellStatus.Attacked) {
                    let placementCoords = this._toPlacementCoords(i, j);
                    Ctx.drawImage(Images['explosion'], placementCoords.x, placementCoords.y);
                }
                else if (this.realField[i][j] == CellStatus.Missed) {
                    let placementCoords = this._toPlacementCoords(i, j);
                    Ctx.drawImage(Images['missed'], placementCoords.x, placementCoords.y);
                }
            }
        }
    }

    isIntersect(x, y) {
        let isXIntersect = x - this.x >= 0 && this.x + (CellSize - 1) * (CellsCount + 1) - x >= 0;
        let isYIntersect = y - this.y >= 0 && this.y + (CellSize - 1) * (CellsCount + 1) - y >= 0;
        return isXIntersect && isYIntersect;
    }

    receiveAttack(x, y) {
        let fieldCoords = this._toFieldCoords(x, y);
        let attackedCell = this.realField[fieldCoords.x][fieldCoords.y];
        if (typeof attackedCell == 'object') {
            let ship = attackedCell;
            ship.damage();
            this.realField[fieldCoords.x][fieldCoords.y] = CellStatus.Attacked;
            return AttackStatus.Attacked;
        }
        if (attackedCell == CellStatus.Empty) {
            this.realField[fieldCoords.x][fieldCoords.y] = CellStatus.Missed;
            return AttackStatus.Missed;
        }
        return AttackStatus.Invalid;
    }

    _toFieldCoords(x, y) {
        let spacing = CellSize;
        let xOffset = x - this.x - spacing;
        let yOffset = y - this.y - spacing;
        let aCoord = Math.floor(xOffset / (spacing - 1));
        let bCoord = Math.floor(yOffset / (spacing - 1));
        return new Vector(aCoord, bCoord);
    }

    _toPlacementCoords(a, b) {
        return new Vector(this.x + this.startPadding + (CellSize - 1) * a, this.y + this.startPadding + (CellSize - 1) * b);
    }

    _clearField() {
        this.field = new Array(CellsCount);
        for (let i = 0; i < CellsCount; i++) {
            this.field[i] = new Array(CellsCount);
        }
        this.realField = new Array(CellsCount);
        for (let i = 0; i < CellsCount; i++) {
            this.realField[i] = new Array(CellsCount);
        }
    }

    _clearEffects() {
        this.effectsField = new Array(CellsCount);
        for (let i = 0; i < CellsCount; i++) {
            this.effectsField[i] = new Array(CellsCount);
        }
    }

    updatePointsField() {
        let pointsField = this.realField;
        function calculateShip(i, j, ship, vector) {
            let points = Vector.getPointsTo(new Vector(i, j), vector);
            for (let point of points) {
                pointsField[point.x][point.y] = ship;
            }
        }
        for (let i = 0; i < CellsCount; i++) {
            for (let j = 0; j < CellsCount; j++) {
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
                this._clearField();
                this._initRandom();
                return;
            }
            let randomPointIndex = Utils.getRandomInRange(0, validPoints.length - 1);
            let randomValidPoint = validPoints[randomPointIndex];
            let a = randomValidPoint.x;
            let b = randomValidPoint.y;
            ship.a = a;
            ship.b = b;
            this.field[ship.a][ship.b] = ship;
            this.updatePointsField();
        }
    }

    _getAvailablePoints(ship) {
        let realField = this.realField;
        function checkCoord(i, j) {
            if (!Vector.isValidPoint(new Vector(i, j))) {
                return true;
            }
            return realField[i][j] == undefined;
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
                let currentPointIsValid = realField[point.x][point.y] == undefined;
                let aroundIsValid = checkAround(point.x, point.y)
                if (!currentPointIsValid || !aroundIsValid) {
                    return false;
                }
            }
            return true;
        }
        let points = []
        for (let i = 0; i < CellsCount; i++) {
            for (let j = 0; j < CellsCount; j++) {
                if (checkForShipPlacement(i, j)){
                    points.push(new Vector(i, j));
                }
            }
        }
        return points;
    }

    countHealth() {
        let totalHealth = 0;
        this.ships.filter(ship => ship.isAlive).map(ship => totalHealth += ship.health);
        return totalHealth;
    }
}

const CellStatus = {Empty: undefined, Missed: 1, Attacked: 2}
const AttackStatus = {Invalid: 0, Missed: 1, Attacked: 2,}