import BigInteger = require('jsbn');
import ee2 = require('eventemitter2');
import Enumerable = require('./../../../lib/linq');
import Coord = require('./../valueobject/coord');
import vp = require('./../valueobject/viewpoint');
import ChunkCache = require('./chunkcache');
import ChunkNotFoundError = require('./chunknotfounderror');

export = MapBase;
class MapBase extends ee2.EventEmitter2 {
    // 地雷（地形）Map 普通の爆弾、☢、Bakuhigashi等
    // 解放状況(close, flag, open)
    /** @protected */
    viewPointChunks = new ChunkCache<vp.ViewPoint>();

    getViewPoint(coord: Coord) {
        try {
            return this.viewPointChunks.getShred(coord);
        } catch (error) {
            console.log(error);
            if (error.name !== ChunkNotFoundError.name)
                throw error;
            var e: ChunkNotFoundError = error;
            this.requestViewPointChunk(e.coord);
            return vp.ViewPoint.Unknown;
        }
    }

    getViewPointChunk(coord: Coord) {
        return this.viewPointChunks.getByCoord(coord);
    }

    getViewPointChunkFromGlobal(coord: Coord) {
        return this.viewPointChunks.getByGlobal(coord);
    }

    putViewPointChunk(coord: Coord, chunk: vp.ViewPoint[][]) {
        return this.viewPointChunks.putByCoord(coord, chunk);
    }

    getNumber(coord: Coord) {
    }

    /** スーパークラスで実装必須 */
    /** @protected */
    requestViewPointChunk(coord: Coord): void {
    }
}
