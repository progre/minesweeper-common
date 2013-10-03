export enum Landform {
    NONE,
    BOMB,
    UNKNOWN
}

export enum Status {
    CLOSE,
    FLAG,
    OPEN,
    UNKNOWN
}

export class ViewPoint {
    constructor(
        public landform: Landform,
        public status: Status) {
    }
}
