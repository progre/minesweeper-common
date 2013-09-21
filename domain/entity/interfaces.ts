import Coord = require('./../valueobject/coord');

export interface IMineWorld {
    players: { [id: number]: IPlayer }
}

export interface IPlayer {
    coord: Coord;
    image: string;
}
