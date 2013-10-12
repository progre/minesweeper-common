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
    static Unknown = new ViewPoint(Landform.UNKNOWN, Status.UNKNOWN);

    constructor(
        public landform: Landform,
        public status: Status) {
    }
}

export class ClientViewPoint {
    constructor(
        public status: Status,
        public mines: number) {
    }
}
