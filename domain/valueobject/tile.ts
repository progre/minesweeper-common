import enums = require('./enums');

export = Tile;
class Tile {
    static Unknown = new Tile(enums.Landform.UNKNOWN, enums.Status.UNKNOWN);

    constructor(
        public landform: enums.Landform,
        public status: enums.Status) {
    }
}