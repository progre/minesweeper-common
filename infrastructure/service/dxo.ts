import iv = require('./../valueobject/interfaces');
import de = require('./../../domain/entity/interfaces');
import Coord = require('./../../domain/valueobject/coord');

export function toMineWorld(dto: iv.IFullDataDTO): de.IMineWorld {
    return {
        yourId: dto.yourId,
        players: Enumerable.from(dto.players)
            .select((x: KVP<iv.IPlayerDTO>) => ({ key: x.key, value: toPlayer(x.value) }))
            .toObject(x => x.key, x => x.value)
    };
}

function toPlayer(dto: iv.IPlayerDTO): de.IPlayer {
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

interface KVP<T> {
    key: string;
    value: T;
}
