import enums = require('./enums');

export = Tile;
class Tile {
    static UNKNOWN = new Tile(
        enums.Landform.UNKNOWN,
        enums.Status.UNKNOWN,
        enums.Layer.UNKNOWN);

    constructor(
        public landform: enums.Landform,
        public status: enums.Status,
        public layer: enums.Layer) {
    }
}