import bi = require('biginteger');

export = Coord;
class Coord {
    static of(x: string, y: string) {
        return new Coord(new bi.BigInteger(x), new bi.BigInteger(y));
    }

    static fromNumber(x: number, y: number) {
        return Coord.of(x.toString(10), y.toString(10));
    }

    static unpack(obj: string[]) {
        return new Coord(bi.BigInteger.parse(obj[0], 36), bi.BigInteger.parse(obj[1], 36));
    }

    /** @private */
    constructor(
        private _x: bi.BigInteger,
        private _y: bi.BigInteger) {
    }

    subtract(target: Coord) {
        return new Coord(this._x.subtract(target.x), this._y.subtract(target.y));
    }

    get x(): number {
        return this._x.toJSValue();
    }

    get y(): number {
        return this._y.toJSValue();
    }

    pack() {
        return [this._x.toString(36), this._y.toString(36)];
    }
}
