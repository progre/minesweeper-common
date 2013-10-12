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

    get xString(): string {
        return this.x.toString();
    }

    get yString(): string {
        return this.y.toString();
    }

    equals(other: Coord): boolean {
        return other.x != null && other.y != null
            && this.x.equals(other.x) && this.y.equals(other.y);
    }

    toString() {
        return '{x: ' + this.x.toString() + ', y: ' + this.y.toString() + '}';
    }

    distance(other: Coord): number {
        var dX = this.x.subtract(other.x);
        var dY = this.y.subtract(other.y);
        if (dX.bitLength() >= 32 || dY.bitLength() >= 32)
            return Number.NaN;
        return Math.sqrt(Math.pow(dX.intValue(), 2) + Math.pow(dY.intValue(), 2));
    }
}
