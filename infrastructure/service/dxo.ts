import iv = require('./../valueobject/interfaces');
import de = require('./../../domain/entity/interfaces');
import Coord = require('./../../domain/valueobject/coord');
import Enumerable = require('./../../../lib/linq');

export function toMineWorld(dto: iv.IFullDataDTO): de.IMineWorld {
    return {
        yourId: dto.yourId,
        players: Enumerable.from(dto.activePlayers)
            .select(x => ({ key: x.key, value: toPlayer(x.value) }))
            .toObject(x => x.key, x => x.value)
    };
}

export function toPlayer(dto: iv.IPlayerDTO): de.IPlayer {
    return {
        coord: toCoord(dto.coord),
        image: dto.image
    };
}

export var toCoord = (dto: iv.ICoordDTO) => Coord.of(dto.x, dto.y);

export function fromCoord(model: Coord) { 
    return {
        x: model.xString,
        y: model.yString
    }
}
