import Coord = require('./../valueobject/coord');

export interface IMineWorld {
    yourId: string;
    players: { [id: string]: IPlayer }
}

export interface IPlayer {
    coord: Coord;
    image: string;
}
