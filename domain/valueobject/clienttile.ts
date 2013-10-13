import enums = require('./enums');

export = ClientTile;
class ClientTile {
    constructor(
        public status: enums.Status,
        public mines: number) {
    }
}
