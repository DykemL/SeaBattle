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
            let currentField;
            let attackStatus = AttackStatus.Invalid;
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
                let gameOverText = this.currentPlayerTurn == Player.Blue ? "Победил синий игрок" : "Победил красный игрок";
                Utils.SwitchGraphicsToGameOver(gameOverText);
                this.isGameOver = true;
            }
            if (attackStatus != AttackStatus.Attacked) {
                this._switchMove();
            }
            this.update();
        };
        document.getElementById("mainMenuLink").onclick = () => {
            let playerNameInput = document.getElementById("playerNameInput");
            let playerName = playerNameInput.value;
            if (playerName == undefined || playerName == '') {
                playerName = "Игрок";
            }
            let health = this.currentPlayerTurn == Player.Blue ? this.fieldBlue.countHealth() : this.fieldRed.countHealth();
            LeaderboardUtils.writeToLeaderboard(playerName, health);
        }
    }

    _switchMove() {
        this.currentPlayerTurn = this.currentPlayerTurn == Player.Blue ? Player.Red: Player.Blue;
    }

    _isFieldAlive(field) {
        let aliveShips = field.ships.filter(ship => ship.isAlive);
        return aliveShips.length != 0;
    }
}

const Player = {Blue: 0, Red: 1};