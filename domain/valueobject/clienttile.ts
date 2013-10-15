import enums = require('./enums');
import Tile = require('./tile');

export = ClientTile;
class ClientTile extends Tile {
    static UNKNOWN = new ClientTile(
        enums.Landform.UNKNOWN,
        enums.Status.UNKNOWN,
        enums.Layer.UNKNOWN,
        -1);

    constructor(
        landform: enums.Landform,
        status: enums.Status,
        layer: enums.Layer,
        public mines: number) {

        super(landform, status, layer);
    }
}
