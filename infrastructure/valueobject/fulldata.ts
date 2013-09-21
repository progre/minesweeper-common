export = FullData;
class FullData {
    constructor(
        public players: {
            [id: string]: {
                coord: {
                    x: string;
                    y: string;
                };
                image: string;
            }
        }) {
    }

    static from() {
        return new FullData(null);
    }
}
