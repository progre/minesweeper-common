export interface IFullDataDTO {
    yourId: number;
    players: { [id: number]: IPlayerDTO }
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
    id: number;
    coord: ICoordDTO;
}
