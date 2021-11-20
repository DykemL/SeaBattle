class ShipFactory {
    static ship1Blue() { return new Ship(Images['ship1Blue'], 1, Alignment.Blue) }
    static ship2Blue() { return new Ship(Images['ship2Blue'], 2, Alignment.Blue) }
    static ship3Blue() { return new Ship(Images['ship3Blue'], 3, Alignment.Blue) }
    static ship4Blue() { return new Ship(Images['ship4Blue'], 4, Alignment.Blue) }
    static ship1Red() { return new Ship(Images['ship1Red'], 1, Alignment.Red) }
    static ship2Red() { return new Ship(Images['ship2Red'], 2, Alignment.Red) }
    static ship3Red() { return new Ship(Images['ship3Red'], 3, Alignment.Red) }
    static ship4Red() { return new Ship(Images['ship4Red'], 4, Alignment.Red) }

    static getBlueSide() {
        return this.blueSide;
    }

    static getRedSide() {
        return this.redSide;
    }

    static init() {
        this.blueSide = [
            this.ship1Blue(), this.ship1Blue(), this.ship1Blue(), this.ship1Blue(),
            this.ship2Blue(), this.ship2Blue(), this.ship2Blue(),
            this.ship3Blue(), this.ship3Blue(),
            this.ship4Blue()
        ];
        this.redSide = [
            this.ship1Red(), this.ship1Red(), this.ship1Red(), this.ship1Red(),
            this.ship2Red(), this.ship2Red(), this.ship2Red(),
            this.ship3Red(), this.ship3Red(),
            this.ship4Red()
        ];
    }
    static blueSide;
    static redSide;
}