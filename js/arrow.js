class Arrow {
    x;
    y;
    blueArrow;
    redArrow;

    height;
    width;

    constructor(x, y, height, width) {
        this.x = x;
        this.y = y;
        this.blueArrow = Images['blueArrow'];
        this.redArrow = Images['redArrow'];
        this.height = height;
        this.width = width;
    }

    draw(player) {
        if (player == Player.Blue) {
            Ctx.drawImage(this.blueArrow, this.x, this.y, this.height, this.width);
        }
        else {
            Ctx.drawImage(this.redArrow, this.x, this.y, this.height, this.width);
        }
    }
}