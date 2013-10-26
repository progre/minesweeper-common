import ee2 = require('eventemitter2');
import Coord = require('./../valueobject/coord');
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

    delayMove(intent: Intent) {
        if (this.movingTimeoutId != null) // タイムアウトが仕込まれている場合は中断
            return;
        if (this.path.length <= 0)
            return;
        var coord = this.path.shift();
        if (!this.field.move(this, coord)) {
            if (intent === Intent.MOVING
                || this.path.length > 0
                || this.field.getTile(coord).status !== enums.Status.CLOSE) {
                this.path = [];
                return;
            }
            switch (intent) {
                case Intent.FLAG:
                    this.field.setLayer(coord, enums.Layer.FLAG);
                    return;
                case Intent.QUESTION:
                    this.field.setLayer(coord, enums.Layer.QUESTION);
                    return;
                case Intent.REMOVE_QUESTION:
                    this.field.setLayer(coord, enums.Layer.NONE);
                    return;
                case Intent.DIGGING:
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
