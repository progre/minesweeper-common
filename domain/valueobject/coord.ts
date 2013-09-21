import bi = require('biginteger');

export = Coord;
class Coord {
    static of(x: string, y: string) {
        console.log(bi);
        return new Coord(new bi.BigInteger(x), new bi.BigInteger(y));
    }

    /** @private */
    constructor(
        private x: bi.BigInteger,
        private y: bi.BigInteger) {
    }

    subtract(target: Coord) {
        return new Coord(this.x.subtract(target.x), this.y.subtract(target.y));
    }
}
