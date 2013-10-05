import Coord = require('./../valueobject/coord');

export = ChunkNotFoundError;
class ChunkNotFoundError implements Error {
    static name = 'ChunkNotFoundError';
    message = '';
    constructor(
        public coord: Coord) {
    }
}
