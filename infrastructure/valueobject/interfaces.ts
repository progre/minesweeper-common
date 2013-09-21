export interface IMineWorldDTO {
    players: {
        [id: number]: IPlayerDTO
    }
}

export interface IPlayerDTO {
    coord: ICoordDTO;
    image: string;
}

export interface ICoordDTO {
    x: string;
    y: string;
}
