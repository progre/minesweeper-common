import BigInteger = require('jsbn');
import Coord = require('./../valueobject/coord');
import ChunkNotFoundError = require('./chunknotfounderror');

export = ChunkCache;
class ChunkCache<T> {
    private cache = new Cache<T[][]>();

    // example: 0-15 -> 0,  16-31 -> 2 -1--16 -> -1
    /** 指定の絶対座標の要素を取得する */
    getShred(coord: Coord): T {
        //console.log('getShred: ' + coord.toString())
        var chunk = this.getByGlobal(coord);
        var y = coord.y.and(new BigInteger('15')).intValue();
        var x = coord.x.and(new BigInteger('15')).intValue();
        //console.log('getShred: ' + x + ', ' + y)
        return chunk[y][x];
    }

    getByGlobal(coord: Coord) {
        //console.log('getByGlobal: ' + coord.x.shiftRight(4) + ', ' + coord.y.shiftRight(4))
        return this.getByXY(coord.x.shiftRight(4), coord.y.shiftRight(4));
    }

    getByCoord(coord: Coord) {
        return this.getByXY(coord.x, coord.y);
    }

    getByXY(x: BigInteger, y: BigInteger) {
        var chunk = this.cache.get(this.createKey(x, y));
        if (chunk == null)
            throw new ChunkNotFoundError(new Coord(x, y));
        return chunk;
    }

    putByCoord(coord: Coord, chunk: T[][]) {
        return this.cache.put(this.createKey(coord.x, coord.y), chunk);
    }

    private createKey(x: BigInteger, y: BigInteger) {
        return x.toString() + ',' + y.toString();
    }
}

class Cache<T> {
    static LIMIT = 100;

    private cache: KVP<T>[] = [];

    get(key: string) {
        var index = findIndex(this.cache, key);
        if (index < 0)
            return null;
        top(this.cache, index);
        return this.cache[0].value;
    }

    put(key: string, value: T): T {
        var index = findIndex(this.cache, key);
        if (index >= 0) {
            // 既に存在する場合
            top(this.cache, index);
            var old = this.cache[0].value;
            this.cache[0].value = value;
            return old;
        }
        this.cache.unshift({ key: key, value: value });
        if (this.cache.length > Cache.LIMIT) {
            // 古いものから削除
            this.cache.length = Cache.LIMIT;
        }
        return null;
    }
}

interface KVP<T> {
    key: string;
    value: T;
}

/** 指定のキーの要素のindexを返す */
function findIndex(array: KVP<any>[], key: string) {
    for (var i = 0, len = array.length; i < len; i++) {
        if (array[i].key === key)
            return i;
    }
    return -1;
}

/** 配列の指定の要素を先頭に持ってくる */
function top(array: any[], index: number) {
    var value = array[index];
    array.splice(index, 1);
    array.unshift(value);
}
