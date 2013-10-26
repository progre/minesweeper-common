import BigInteger = require('jsbn');
import ee2 = require('eventemitter2');
import enums = require('./../valueobject/enums');
import Coord = require('./../valueobject/coord');
import ChunkCache = require('./chunkcache');
import ChunkNotFoundError = require('./chunknotfounderror');
import Chunk = require('./chunk');
import PathFinder = require('./pathfinder');

export = LandformBase;
class LandformBase extends ee2.EventEmitter2 {
    pathFinder = new PathFinder(this);
    // 地雷（地形）Map 普通の爆弾、☢、Bakuhigashi等
    // 解放状況(close, flag, open)
    /** @protected */
    tileChunks = new ChunkCache<any>();

    getTile(coord: Coord) {
        try {
            return this.tileChunks.getShred(coord);
        } catch (error) {
            if (error.name !== ChunkNotFoundError.name)
                throw error;
            var e: ChunkNotFoundError = error;
            this.requestTileChunk(e.coord);
            return null;
        }
    }

    getTileChunk(coord: Coord) {
        try {
            return this.tileChunks.getByCoord(coord);
        } catch (error) {
            if (error.name !== ChunkNotFoundError.name)
                throw error;
            var e: ChunkNotFoundError = error;
            this.requestTileChunk(e.coord);
            return null;
        }
    }

    getTileChunkFromGlobal(coord: Coord) {
        return this.tileChunks.getByGlobal(coord);
    }

    putTile(coord: Coord, tile: any) {
        var updated = this.tileChunks.putShred(coord, tile);
        super.emit('view_point_updated', tile);
        return updated;
    }

    putTileChunk(coord: Coord, chunk: Chunk<any>) {
        var updated = this.tileChunks.putByCoord(coord, chunk);
        super.emit('chunk_updated', coord);
        return updated;
    }

    move(obj: { coord: Coord }, to: Coord) {
        if (!this.isMovable(to))
            return false;
        obj.coord = to;
        return true;
    }

    setLayer(coord: Coord, layer: enums.Layer) {
        var tile = this.getTile(coord);
        tile.layer = layer;
    }

    getNumber(coord: Coord) {
    }

    /** @abstract */
    isMovable(coord: Coord): boolean {
        throw new Error('Not implemented.');
    }

    /** @abstract */
    /** @protected */
    requestTileChunk(coord: Coord): void {
        throw new Error('Not implemented.');
    }
}
