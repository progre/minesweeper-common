import Coord = require('./../valueobject/coord');

export interface IMineWorld {
    yourId: string;
    players: IHash<IPlayer>;
}

export interface IHash<T> {
    [key: string]: T;
}

export interface IPlayer {
    coord: Coord;
    image: string;
}
