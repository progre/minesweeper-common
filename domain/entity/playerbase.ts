import ee2 = require('eventemitter2');
import Coord = require('./../valueobject/coord');
import enums = require('./../valueobject/enums');
import LandformBase = require('./landformbase');

export = PlayerBase;
class PlayerBase extends ee2.EventEmitter2 {
    field: LandformBase;
    movingTimeoutId = null;
    path: Coord[];

    constructor(
        public coord: Coord,
        public image: string) {

        super();
    }

    delayMove(intent: enums.Intent) {
        if (this.movingTimeoutId != null) // �^�C���A�E�g���d���܂�Ă���ꍇ�͒��f
            return;
        if (this.path.length <= 0)
            return;
        var coord = this.path.shift();
        if (!this.field.move(this, coord)) {
            if (intent === enums.Intent.MOVING
                || this.path.length > 0
                || this.field.getTile(coord).status !== enums.Status.CLOSE) {
                this.path = [];
                return;
            }
            switch (intent) {
                case enums.Intent.FLAG:
                    this.field.setLayer(coord, enums.Layer.FLAG);
                    return;
                case enums.Intent.QUESTION:
                    this.field.setLayer(coord, enums.Layer.QUESTION);
                    return;
                case enums.Intent.REMOVE_QUESTION:
                    this.field.setLayer(coord, enums.Layer.NONE);
                    return;
                case enums.Intent.DIGGING:
                    this.field.dig(coord);
                    return;
            }
        }
        super.emit('moved', this.coord);
        this.movingTimeoutId = setTimeout(() => {
            this.movingTimeoutId = null;
            this.delayMove(intent);
        }, 100);
    }
}
