import BigInteger = require('jsbn');
import Coord = require('./../valueobject/coord');

export = Chunk;
class Chunk<T> {
    static coordFromGlobal(coord: Coord): Coord {
        return new Coord(coord.x.shiftRight(4), coord.y.shiftRight(4));
    }

    /** chunk���W�n���΍��W�ɕϊ��ichunk�̍���n�_��Ԃ��j */
    static toGlobal(chunkCoord: Coord): Coord {
        return new Coord(chunkCoord.x.shiftLeft(4), chunkCoord.y.shiftLeft(4));
    }

    constructor(
        private items: T[][]) {
    }

    /** �O���[�o�����W�ŗv�����Ă���ʃr�b�g�͖������� */
    getByCoord(coord: Coord) {
        var y = coord.y.and(new BigInteger('15')).intValue();
        var x = coord.x.and(new BigInteger('15')).intValue();
        return this.items[y][x];
    }

    get(x: number, y: number) {
        return this.items[y][x];
    }

    /** �O���[�o�����W�Ŏw�肵�Ă���ʃr�b�g�͖������� */
    putByCoord(coord: Coord, value: T) {
        var y = coord.y.and(new BigInteger('15')).intValue();
        var x = coord.x.and(new BigInteger('15')).intValue();
        return this.put(x, y, value);
    }

    put(x: number, y: number, value: T) {
        var old = this.items[y][x];
        this.items[y][x] = value;
        return old;
    }

    map<U>(callbackfn: (value: T, coord?: Coord) => U) {
        return this.items.map((line, y) => line.map(
            (tile, x) => callbackfn(tile, Coord.fromNumber(x, y))));
    }
}
