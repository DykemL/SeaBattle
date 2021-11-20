class Vector {
    x;
    y;

    constructor(x, y) {
        this.x = x;
        this.y = y;
    }

    getPointsTo(i, j) {
        let toVector = new Vector(i, j);
        return Vector.getPointsTo(this, toVector)
    }

    static getPointsTo(vecFrom, vecTo) {
        if (vecTo.x == 0 && vecTo.y == 0) {
            return [vecFrom];
        }
        let points = [];
        let isXAxis = Math.abs(vecTo.x) > 0;
        let isYAxis = Math.abs(vecTo.y) > 0;
        if (isXAxis && isYAxis) {
            throw "Неправильный вектор";
        }
        if (isXAxis) {
            let isPositive = vecTo.x >= 0;
            if (isPositive) {
                for (let i = 0; i <= vecTo.x; i++) {
                    let point = new Vector(vecFrom.x + i, vecFrom.y);
                    points.push(point);
                }
            }
            else {
                for (let i = 0; i >= vecTo.x; i--) {
                    let point = new Vector(vecFrom.x + i, vecFrom.y);
                    points.push(point);
                }
            }
        }
        else {
            let isPositive = vecTo.y >= 0;
            if (isPositive) {
                for (let i = 0; i <= vecTo.y; i++) {
                    let point = new Vector(vecFrom.x, vecFrom.y + i);
                    points.push(point);
                }
            }
            else {
                for (let i = 0; i >= vecTo.y; i--) {
                    let point = new Vector(vecFrom.x, vecFrom.y + i);
                    points.push(point);
                }
            }
        }

        return points;
    }

    static isValidPoint(vector) {
        return (vector.x >= 0 && vector.y >= 0 && vector.x <= FieldSize - 1 && vector.y <= FieldSize - 1)
    }
}