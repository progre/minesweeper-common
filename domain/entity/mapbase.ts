import BigInteger = require('jsbn');
import Enumerable = require('./../../../lib/linq');
import Coord = require('./../valueobject/coord');
import vp = require('./../valueobject/viewpoint');
import ChunkCache = require('./chunkcache');

export = MapBase;
class MapBase {
    // 地雷（地形）Map 普通の爆弾、☢、Bakuhigashi等
    // 解放状況(close, flag, open)
    private viewPointChunks = new ChunkCache<vp.ViewPoint>();

    getViewPoint(coord: Coord) {
        return this.viewPointChunks.getShred(coord);
    }

    getViewPointChunk(coord: Coord) {
        return this.viewPointChunks.getByCoord(coord);
    }

    getViewPointChunkFromGlobal(coord: Coord) {
        return this.viewPointChunks.getByGlobal(coord);
    }

    getNumber(coord: Coord) {
    }
}
