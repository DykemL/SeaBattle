class Game {
    isDebugMode = false;

    fieldBlue;
    fieldRed;

    currentPlayerTurn;
    isGameOver;

    arrow;

    constructor() {
        this.currentPlayerTurn = Player.Blue;
        this.isGameOver = false;
        let marginLeft = FieldMarginSide + CellsCount * (CellSize + 1) + 55;
        let marginTop = 300;
        this.arrow = new Arrow(marginLeft, marginTop, 150, 50);
    }

    move(field, x, y) {
        if (!field.isIntersect(x, y)) {
            return AttackStatus.Invalid;
        }
        return field.receiveAttack(x, y)
    }

    inititalizeGame() {
        this._initializeFields();
        this._initializeEvents();
        this.update();
    }

    update() {
        Ctx.clearRect(0, 0, 1920, 969);
        this.fieldBlue.drawAll();
        this.fieldRed.drawAll();
        this.arrow.draw(this.currentPlayerTurn);
    }

    _initializeFields() {
        this.fieldBlue = new Field(FieldMarginSide, FieldMarginTop, Alignment.Blue);
        this.fieldRed = new Field(Canvas.width - FieldMarginSide - Images['field'].width, FieldMarginTop, Alignment.Red);
        this.fieldBlue.initialize();
        this.fieldRed.initialize();
        this.update();
        return [this.fieldBlue, this.fieldRed];
    }

    _initializeEvents() {
        Canvas.onmousedown = event => {
            if (this.isGameOver) {
                return;
            }
            let x = event.pageX;
            let y = event.pageY;
            let attackStatus = AttackStatus.Invalid;
            let currentField;
            if (this.currentPlayerTurn == Player.Blue) {
                currentField = this.fieldRed;
                attackStatus = this.move(this.fieldRed, x, y);
            }
            else {
                currentField = this.fieldBlue;
                attackStatus = this.move(this.fieldBlue, x, y);
            }
    
            if (attackStatus == AttackStatus.Invalid) {
                return;
            }
            
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
            }
            if (attackStatus != AttackStatus.Attacked) {
                this._switchMove();
            }
            this.update();
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