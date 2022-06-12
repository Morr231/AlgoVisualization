import LinkedList from "./linked-list";

class Graph {
    constructor(vertices = 0) {
        this.v = vertices;
        this.graph = new Map();
    }

    insert(mainNode, NNode) {
        const mainNodeNumber = mainNode.vertice;
        const NNodeNumber = NNode.vertice;

        if (!this.graph.has(mainNodeNumber)) {
            this.graph.set(mainNodeNumber, new LinkedList());
            this.v++;
        }

        if (!this.graph.has(NNodeNumber)) {
            this.graph.set(NNodeNumber, new LinkedList());
            this.v++;
        }

        const mainNodeLL = this.graph.get(mainNodeNumber);
        const NNodeLL = this.graph.get(NNodeNumber);

        if (!mainNodeLL.find(NNode)) {
            mainNodeLL.insert(NNode);
        }

        if (!NNodeLL.find(mainNode)) {
            NNodeLL.insert(mainNode);
        }
    }

    dijkstra(start) {
        // Result array
        const shortestFromNode = {};

        this.graph.forEach((value, key) => {
            shortestFromNode[key] = [Infinity, 0, 0, 0];
        });

        shortestFromNode[start] = [0, 0, 0, 0];

        const unvisitedNodes = [];
        const visitedNodes = [];

        let currNode = this.graph.get(start);
        let currNodeIndex = start;

        // neighbour -> N

        for (let i = 0; i < this.v; i++) {
            // N of initial(curr) node

            if (currNode == null) {
                break;
            }

            let tempNode = currNode.head;
            let minValue = Infinity;
            let minIndex = -1;

            while (tempNode) {
                // Weight of N node + shortest path till initial node = new path till N node
                let pathValue =
                    tempNode.block.weight + shortestFromNode[currNodeIndex][0];

                // If shortest path till N > new path till N node, we change it
                if (pathValue < shortestFromNode[tempNode.block.vertice][0]) {
                    shortestFromNode[tempNode.block.vertice] = [
                        pathValue,
                        currNodeIndex,
                        tempNode.block.x,
                        tempNode.block.y,
                    ];
                }

                // If new path > min
                // Searching all N for min value
                if (
                    visitedNodes.indexOf(tempNode.block.vertice) == -1 &&
                    pathValue < minValue
                ) {
                    minValue = pathValue;
                    minIndex = tempNode.block.vertice;
                }

                unvisitedNodes.push(tempNode.block.vertice);

                tempNode = tempNode.next;
            }

            // Searching all unvisited if they < min
            unvisitedNodes.forEach((node) => {
                if (
                    visitedNodes.indexOf(node) == -1 &&
                    shortestFromNode[node][0] < minValue
                ) {
                    minValue = shortestFromNode[node][0];
                    minIndex = node;
                }
            });

            currNode = this.graph.get(minIndex);
            currNodeIndex = minIndex;

            visitedNodes.push(minIndex);
            unvisitedNodes.splice(minIndex, 1);
        }

        return shortestFromNode;
    }
}

export default Graph;
