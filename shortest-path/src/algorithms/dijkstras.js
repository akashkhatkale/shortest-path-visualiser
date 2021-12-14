

export function dijkstras(grid, startNode, finishNode) {
    startNode.distance = 0
    const unvisitedNodes = getAllNodes(grid);
    const orderedVisitedNodes = [];
    while (!!unvisitedNodes.length) {
        unvisitedNodes.sort((nodeA, nodeB) => nodeA.distance - nodeB.distance);
        const closest = unvisitedNodes.shift()
        if (closest.distance == Infinity) return orderedVisitedNodes; // no solution 
        if (closest.isWall) continue;
        if (closest == finishNode) return orderedVisitedNodes // reached finish node
        closest.isVisited = true
        orderedVisitedNodes.push(closest)

        // update distance of neighbours
        updateNeighboursDistance(closest, grid)
    }

    return orderedVisitedNodes
}

function getAllNodes(grid) {
    const nodes = [];
    for (let row of grid) {
        for (let node of row) {
            nodes.push(node);
        }
    }
    return nodes;
}




function updateNeighboursDistance(node, grid) {
    const neighbours = [];
    const { col, row } = node;
    // the checks are done to make sure the array is not out of bounds
    if (col < grid[0].length - 1) {
        // right neighbour
        var n = grid[row][col + 1]

        neighbours.push(n)
    }
    if (row < grid.length - 1) {
        // bottom neighbour
        var n = grid[row + 1][col]

        neighbours.push(n)
    }
    if (row > 0) {
        // upper neighbour
        var n = grid[row - 1][col]

        neighbours.push(n)
    }
    if (col > 0) {
        // left neighbour
        var n = grid[row][col - 1]

        neighbours.push(n)
    }

    const unvisitedNeighbours = neighbours.filter(neighbour => !neighbour.isVisited)
    for (const unvisited of unvisitedNeighbours) {
        unvisited.distance = node.distance + 1;
        unvisited.previousNode = node;
    }
}


export function orderedShortestPath(finishNode) {
    const nodesInShortestPath = [];
    let currentNode = finishNode; //setup initial node as the final node
    while (currentNode !== null) { //while current node isn't start node
        nodesInShortestPath.unshift(currentNode); //keep adding current node to front of array
        currentNode = currentNode.previousNode; //update currentNode
    }
    return nodesInShortestPath;
}