export = FullData;
class FullData {
    constructor(
        public players: {
            coord: {
                x: string;
                y: string;
            };
            image: string;
        }[]) {
    }

    static from() {
        return new FullData(null);
    }
}
