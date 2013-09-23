import Coord = require('./../valueobject/coord');

export interface IMineWorld {
    yourId: number;
    players: IHash<IPlayer>;
}

export interface IHash<T> {
    [key: number]: T;
}

export interface IPlayer {
    coord: Coord;
    image: string;
}
