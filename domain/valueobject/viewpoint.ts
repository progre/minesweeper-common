export enum Landform {
    None,
    Bomb
}

export enum Status {
    Close,
    Flag,
    Open
}

export class ViewPoint {
    constructor(
        public landform: Landform,
        public status: Status) {
    }
}
