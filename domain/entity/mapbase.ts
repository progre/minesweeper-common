import BigInteger = require('jsbn');
import Enumerable = require('./../../../lib/linq');
import Coord = require('./../valueobject/coord');
import vp = require('./../valueobject/viewpoint');
import ChunkCache = require('./chunkcache');

export = MapBase;
class MapBase {
    // 地雷（地形）Map 普通の爆弾、☢、Bakuhigashi等
    // 解放状況(close, flag, open)

    constructor(
        private viewPointChunks: ChunkCache<vp.ViewPoint>) {
    }

    getViewPoint(coord: Coord) {
        return this.viewPointChunks.get(coord);
    }

    getViewPointChunk(coord: Coord) {
        return this.viewPointChunks.getChunk(coord.x, coord.y);
    }

    getViewPointChunkFromGlobal(coord: Coord) {
        return this.viewPointChunks.getChunkFromGlobal(coord);
    }

    getNumber(coord: Coord) {
    }
}
