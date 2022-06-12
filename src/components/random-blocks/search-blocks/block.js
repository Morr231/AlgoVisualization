class Block {
    constructor (
        vertice = 0,
        x = 0,
        y = 0,
        weight = 0,
        state = "default",
        visited = false,
        blockElement = null
    ) {
        this.vertice = vertice;
        this.x = x;
        this.y = y;
        this.weight = weight;
        this.state = state;
        this.visited = visited;
        this.blockElement = blockElement;
    }
}

module.exports = Block;
