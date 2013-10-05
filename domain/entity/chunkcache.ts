import BigInteger = require('jsbn');
import Coord = require('./../valueobject/coord');

export = ChunkCache;
class ChunkCache<T> {
    private caches: Caches<T[][]>;

    /** getFromRepositoryは必ず値を返すこと */
    constructor(
        private getFromRepository: (key: string) => T[][]) {
        this.caches = new Caches<T[][]>(getFromRepository);
    }

    // example: 0-15 -> 0,  16-31 -> 2 -1--16 -> -1
    /** 指定の絶対座標の要素を取得する */
    get(coord: Coord): T {
        var chunk = this.getChunkFromGlobal(coord);
        var y = coord.y.and(new BigInteger('15')).intValue();
        var x = coord.x.and(new BigInteger('15')).intValue();
        return chunk[y][x];
    }

    getChunkFromGlobal(coord: Coord) {
        return this.getChunk(coord.x.shiftRight(4), coord.y.shiftRight(4));
    }

    getChunk(x: BigInteger, y: BigInteger) {
        return this.caches.get(this.createKey(x, y));
    }

    private createKey(x: BigInteger, y: BigInteger) {
        return x.toString() + ',' + y.toString();
    }
}

class Caches<T> {
    static LIMIT = 100;

    private caches: KVP<T>[] = [];

    constructor(
        private getFromRepository: (key: string) => T) {
    }

    get(key: string) {
        var index = -1;
        for (var i = 0, len = this.caches.length; i < len; i++) {
            if (this.caches[index].key !== key)
                continue;
            index = i;
            break;
        }
        if (index >= 0) {
            top(this.caches, index);
            return this.caches[0].value;
        }
        // リポジトリから取得
        // キャッシュイン
        this.caches.unshift({ key: key, value: this.getFromRepository(key) });
        if (this.caches.length > Caches.LIMIT) {
            // 古いものから削除
            this.caches.length = Caches.LIMIT;
        }
        return this.caches[0].value;
    }
}

interface KVP<T> {
    key: string;
    value: T;
}

/** 配列の指定の要素を先頭に持ってくる */
function top(array: any[], index: number) {
    var value = array[index];
    array.splice(index, 1);
    array.unshift(value);
}
