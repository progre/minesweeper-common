import BigInteger = require('jsbn');

export = Coord;
class Coord {
    static of(x: string, y: string) {
        return new Coord(new BigInteger(x), new BigInteger(y));
    }

    static fromNumber(x: number, y: number) {
        return Coord.of(x.toString(10), y.toString(10));
    }

    /** @private */
    constructor(
        public x: BigInteger,
        public y: BigInteger) {
    }

    add(target: Coord) {
        return new Coord(this.x.add(target.x), this.y.add(target.y));
    }

    subtract(target: Coord) {
        return new Coord(this.x.subtract(target.x), this.y.subtract(target.y));
    }

    get xIntValue(): number {
        return this.x.intValue();
    }

    get yIntValue(): number {
        return this.y.intValue();
    }

    get xString() {
        return this.x.toString();
    }

    get yString() {
        return this.y.toString();
    }
}
