class Game {
    fieldBlue;
    fieldRed;

    currentPlayerTurn;
    isGameOver;

    constructor() {
        this.currentPlayerTurn = Player.Blue;
        this.isGameOver = false;
    }

    move(field, x, y) {
        if (!field.isIntersect(x, y)) {
            return false;
        }
        if (!field.receiveAttack(x, y)) {
            return false;
        }
        return true;
    }

    inititalizeGame() {
        this._initializeFields();
        this._drawFields();
        this._initializeEvents();
    }

    _initializeFields() {
        this.fieldBlue = new Field(FieldMarginSide, FieldMarginTop, Alignment.Blue);
        this.fieldRed = new Field(Canvas.width - FieldMarginSide - Images['field'].width, FieldMarginTop, Alignment.Red);
        this.fieldBlue.initialize();
        this.fieldRed.initialize();
        this._drawFields([this.fieldBlue, this.fieldRed]);
        return [this.fieldBlue, this.fieldRed];
    }

    _drawFields() {
        this.fieldBlue.drawAll();
        this.fieldRed.drawAll();
    }

    _initializeEvents() {
        Canvas.onmousedown = event => {
            if (this.isGameOver) {
                return;
            }
            let x = event.pageX;
            let y = event.pageY;
            let moveResult = false;
            let currentField;
            if (this.currentPlayerTurn == Player.Blue) {
                currentField = this.fieldRed;
                moveResult = this.move(this.fieldRed, x, y);
            }
            else {
                currentField = this.fieldBlue;
                moveResult = this.move(this.fieldBlue, x, y);
            }
    
            if (!moveResult) {
                return;
            }
            currentField.drawAll();
            if (!this._isFieldAlive(currentField)) {
                let gameOverText;
                if (this.currentPlayerTurn == Player.Blue) {
                    gameOverText = "Победил синий игрок";
                } 
                else {
                    gameOverText = "Победил красный игрок";
                }
                Utils.SwitchGraphicsToGameOver(gameOverText);
                this.isGameOver = true;
                return;
            }
            this._switchMove();
        };
    }

    _switchMove() {
        if (this.currentPlayerTurn == Player.Blue) {
            this.currentPlayerTurn = Player.Red;
        }
        else {
            this.currentPlayerTurn = Player.Blue;
        }
    }

    _isFieldAlive(field) {
        let aliveShips = field.ships.filter(ship => ship.isAlive);
        if (aliveShips.length == 0) {
            return false;
        }
        return true;
    }
}

const Player = {Blue: 0, Red: 1};