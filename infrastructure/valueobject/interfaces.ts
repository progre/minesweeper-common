export interface IFullDataDTO {
    yourId: string;
    players: { [id: string]: IPlayerDTO }
}

export interface IPlayerDTO {
    coord: ICoordDTO;
    image: string;
}

export interface ICoordDTO {
    x: string;
    y: string;
}

export interface IMoveDTO {
    id: string;
    coord: ICoordDTO;
}
