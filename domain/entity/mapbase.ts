import BigInteger = require('jsbn');
import ee2 = require('eventemitter2');
import Enumerable = require('./../../../lib/linq');
import Coord = require('./../valueobject/coord');
import vp = require('./../valueobject/viewpoint');
import ChunkCache = require('./chunkcache');
import ChunkNotFoundError = require('./chunknotfounderror');

export = MapBase;
class MapBase extends ee2.EventEmitter2 {
    private unknownPlace = createUnknownPlace();

    // 地雷（地形）Map 普通の爆弾、☢、Bakuhigashi等
    // 解放状況(close, flag, open)
    /** @protected */
    viewPointChunks = new ChunkCache<vp.ViewPoint>();

    getViewPoint(coord: Coord) {
        try {
            return this.viewPointChunks.getShred(coord);
        } catch (error) {
            if (error.name !== ChunkNotFoundError.name)
                throw error;
            var e: ChunkNotFoundError = error;
            this.requestViewPointChunk(e.coord);
            return vp.ViewPoint.Unknown;
        }
    }

    getViewPointChunk(coord: Coord) {
        try {
            return this.viewPointChunks.getByCoord(coord);
        } catch (error) {
            if (error.name !== ChunkNotFoundError.name)
                throw error;
            var e: ChunkNotFoundError = error;
            this.requestViewPointChunk(e.coord);
            return this.unknownPlace;
        }
    }

    getViewPointChunkFromGlobal(coord: Coord) {
        try {
            return this.viewPointChunks.getByGlobal(coord);
        } catch (error) {
            if (error.name !== ChunkNotFoundError.name)
                throw error;
            var e: ChunkNotFoundError = error;
            this.requestViewPointChunk(e.coord);
            return this.unknownPlace;
        }
    }

    putViewPointChunk(coord: Coord, chunk: vp.ViewPoint[][]) {
        try {
            return this.viewPointChunks.putByCoord(coord, chunk);
        } catch (error) {
            if (error.name !== ChunkNotFoundError.name)
                throw error;
            var e: ChunkNotFoundError = error;
            this.requestViewPointChunk(e.coord);
            return this.unknownPlace;
        }
    }

    getNumber(coord: Coord) {
    }

    /** スーパークラスで実装必須 */
    /** @protected */
    requestViewPointChunk(coord: Coord): void {
    }
}

function createUnknownPlace(): vp.ViewPoint[][] {
    return Enumerable.generate(() =>
        Enumerable.generate(() =>
            new vp.ViewPoint(vp.Landform.UNKNOWN, vp.Status.UNKNOWN),
            16).toArray(),
        16).toArray();
}
