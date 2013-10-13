import BigInteger = require('jsbn');
import ee2 = require('eventemitter2');
import enums = require('./../valueobject/enums');
import Coord = require('./../valueobject/coord');
import ChunkCache = require('./chunkcache');
import ChunkNotFoundError = require('./chunknotfounderror');
import Chunk = require('./chunk');

export = LandformBase;
class LandformBase extends ee2.EventEmitter2 {
    // 地雷（地形）Map 普通の爆弾、☢、Bakuhigashi等
    // 解放状況(close, flag, open)
    /** @protected */
    viewPointChunks = new ChunkCache<any>();

    getViewPoint(coord: Coord) {
        try {
            return this.viewPointChunks.getShred(coord);
        } catch (error) {
            if (error.name !== ChunkNotFoundError.name)
                throw error;
            var e: ChunkNotFoundError = error;
            this.requestViewPointChunk(e.coord);
            return null;
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
            return null;
        }
    }

    getViewPointChunkFromGlobal(coord: Coord) {
        return this.viewPointChunks.getByGlobal(coord);
    }

    putViewPoint(coord: Coord, viewPoint: any) {
        var updated = this.viewPointChunks.putShred(coord, viewPoint);
        super.emit('view_point_updated', viewPoint);
        return updated;
    }

    putViewPointChunk(coord: Coord, chunk: Chunk<any>) {
        var updated = this.viewPointChunks.putByCoord(coord, chunk);
        super.emit('chunk_updated', coord);
        return updated;
    }

    getNumber(coord: Coord) {
    }

    /** スーパークラスで実装必須 */
    /** @protected */
    requestViewPointChunk(coord: Coord): void {
    }
}
