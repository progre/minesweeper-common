import BigInteger = require('jsbn');
import Enumerable = require('../../../lib/linq');
import Coord = require('./../../../minesweeper-common/domain/valueobject/coord');
import enums = require('./../../../minesweeper-common/domain/valueobject/enums');

export = PathFinder;
class PathFinder {
    constructor(
        private field: { isMovable: (coord: Coord) => boolean }) {
    }

    find(from: Coord, to: Coord) {
        var openList = new OpenList(new Node(from, null, 0, 0));
        var closeList: Node[] = [];
        while (!openList.empty()) {
            var lowNode = openList.pop(); // コストの一番安いノード
            if (lowNode.coord.equals(to)) {
                return createPath(closeList, lowNode);// 経路完成
            }
            closeList.push(lowNode);
            lowNode.coord.getArounds().forEach((around: Coord) => {
                if (openList.contains(around) || contains(closeList, around))
                    return;// continue
                if (!around.equals(to) && !this.field.isMovable(around))
                    return;// continue
                var distance = around.distance(to);
                if (isNaN(distance))
                    return;// continue
                openList.push(new Node(
                    around,
                    lowNode.coord,
                    lowNode.cost + 1,
                    distance));
            });
        }
        return <Coord[]>[];
    }
}

function createPath(closeList: Node[], lastNode: Node) {
    var path: Coord[] = [];
    var node = lastNode;
    for (; ;) {
        if (!node.hasParent())
            return path;
        path.unshift(node.coord);
        node = Enumerable.from(closeList).firstOrDefault(x => x.isParent(node));
        if (node == null)
            throw new Error('fuck');
    }
}

function contains(array: Node[], value: Coord) {
    return array.some(x => x.coord.equals(value));
}

class Node {
    constructor(
        public coord: Coord,
        private parent: Coord,
        public cost: number,
        private heuristic: number) {
    }

    hasParent() {
        return this.parent != null;
    }

    isParent(child: Node) {
        return this.coord.equals(child.parent);
    }

    totalCost() {
        return this.cost + this.heuristic;
    }
}

class OpenList {
    private items: Node[];

    constructor(item: Node) {
        this.items = [item];
    }

    push(item: Node) {
        this.items.push(item);
    }

    pop(): Node {
        return this.removeAt(this.minCostIndex());
    }

    empty() {
        return this.items.length <= 0;
    }

    contains(coord: Coord) {
        return contains(this.items, coord);
    }

    private minCostIndex() {
        var min = Number.MAX_VALUE;
        var minIndex = -1;
        for (var i = 0, len = this.items.length; i < len; i++) {
            var item = this.items[i];
            var totalScore = item.totalCost();
            if (min > totalScore) {
                min = totalScore;
                minIndex = i;
            }
        }
        return minIndex;
    }

    private removeAt(index: number) {
        return this.items.splice(index, 1)[0];
    }
}
