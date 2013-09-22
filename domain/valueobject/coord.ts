import bi = require('biginteger');

export = Coord;
class Coord {
    static of(x: string, y: string) {
        return new Coord(new bi.BigInteger(x), new bi.BigInteger(y));
    }

    static fromNumber(x: number, y: number) {
        return Coord.of(x.toString(10), y.toString(10));
    }

    /** @private */
    constructor(
        public x: bi.BigInteger,
        public y: bi.BigInteger) {
    }

    subtract(target: Coord) {
        return new Coord(this.x.subtract(target.x), this.y.subtract(target.y));
    }

    get xJSValue(): number {
        return this.x.toJSValue();
    }

    get yJSValue(): number {
        return this.y.toJSValue();
    }

    get xString() {
        return this.x.toString();
    }

    get yString() {
        return this.y.toString();
    }
}
