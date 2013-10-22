import Coord = require('./../../domain/valueobject/coord');
import iv = require('./../valueobject/interfaces');

export var toCoord = (dto: iv.ICoordDTO) => Coord.of(dto.x, dto.y);

export function fromCoord(model: Coord): iv.ICoordDTO { 
    return {
        x: model.xString,
        y: model.yString
    }
}
