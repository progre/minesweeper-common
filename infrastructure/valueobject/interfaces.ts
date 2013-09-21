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
