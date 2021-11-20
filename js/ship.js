class Ship {
    image;
    size;

    a;
    b;
    direction;
    alignment;
    
    isAlive;

    constructor(image, size, alignment) {
        this.image = image;
        this.size = size;
        this.alignment = alignment;
        this.direction = Direction.Top;
        this.isAlive = true;
    }

    draw(x, y) {
        Ctx.save();   
        Ctx.translate(x, y); 
        Ctx.translate(InnerCellSize / 2, InnerCellSize / 2); 
        Ctx.rotate((-Math.PI / 2) * this.direction); 
        Ctx.drawImage(this.image, -CellSize / 2 + 1, -CellSize / 2 + 1);
        Ctx.restore();
    }
}

const Alignment = {Blue: 0, Red: 1};

const Direction = {Right: 0, Top: 1, Left: 2, Bottom: 3};

function getRandomDirection() {
    let number = getRandomInRange(0, 3);
    switch (number) {
        case 0: return Direction.Top;
        case 1: return Direction.Right;
        case 2: return Direction.Bottom;
        case 3: return Direction.Left;
    }
    throw "getRandomDirection error";
}

function toVector(direction, size = 1) {
    size--;
    switch (direction) {
        case Direction.Top: return new Vector(0, -size);
        case Direction.Right: return new Vector(size, 0);
        case Direction.Bottom: return new Vector(0, size);
        case Direction.Left: return new Vector(-size, 0);
    }
}