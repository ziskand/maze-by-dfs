class Cell {
    constructor(x, y) {
        this.recX = x;
        this.recY = y;
    };

    get x() {
        return this.recX;
    }

    get y() {
        return this.recY;
    }
}

export default Cell;