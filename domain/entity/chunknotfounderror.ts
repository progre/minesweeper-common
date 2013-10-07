import Coord = require('./../valueobject/coord');

export = ChunkNotFoundError;
class ChunkNotFoundError implements Error {
    static name = 'ChunkNotFoundError';
    name = ChunkNotFoundError.name;
    message = '';
    constructor(
        public coord: Coord) {
    }
}
