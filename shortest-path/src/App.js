import './App.scss';
import React, { Component, useState } from 'react'
import Node from './components/Node'
import './App.scss'
import { dijkstras, orderedShortestPath } from './algorithms/dijkstras';


class App extends Component {

  constructor(props) {
    super(props)
    this.state = {
      grid: [],
      startCoordinates: [5, 5],
      endCoordinates: [8, 30],
      isWallClicked: false
    }

    this.walls = {}
    this.isWall = false
    this.onNodeClicked = this.onNodeClicked.bind(this)
    this.visualisDijkstra = this.visualisDijkstra.bind(this)
    this.onWallClicked = this.onWallClicked.bind(this)
  }

  onNodeClicked(row, col) {
    const { startCoordinates, endCoordinates } = this.state;
    console.log("gen grid")
    if (this.isWall) {
      // set the wallss
      console.log("setting the walls")
      this.walls[`${row},${col}`] = "wall"
      console.log("walls " + this.walls)
      const grid = generateGrid(startCoordinates, endCoordinates, this.walls);
      this.setState({
        grid
      })
      return
    } else {
      if (startCoordinates[0] == -1 && startCoordinates[1] == -1) {
        // set the start node
        const start = [row, col]
        const grid = generateGrid(start, endCoordinates, this.walls)
        this.setState({
          startCoordinates: start,
          grid: grid
        })
        return
      } else {

        if (row == startCoordinates[0] && col == startCoordinates[1]) {
          // remove the start node
          const start = [-1, -1]
          const grid = generateGrid(start, endCoordinates, this.walls)
          this.setState({
            startCoordinates: start,
            grid: grid
          })
          return
        } else if (row == endCoordinates[0] && col == endCoordinates[1]) {
          // remove the end node
          const end = [-1, -1]
          const grid = generateGrid(startCoordinates, end, this.walls)
          this.setState({
            endCoordinates: end,
            grid: grid
          })
          return
        } else {
          // set the end node
          const end = [row, col]
          const grid = generateGrid(startCoordinates, end, this.walls)
          this.setState({
            endCoordinates: end,
            grid: grid
          })
          return
        }

      }
    }

  }


  visualisDijkstra() {
    const { grid, startCoordinates, endCoordinates } = this.state;
    const startNode = getStartNode(startCoordinates[0], startCoordinates[1], grid);
    const endNode = getEndNode(endCoordinates[0], endCoordinates[1], grid);
    const visitedNodes = dijkstras(grid, startNode, endNode)
    const orderedNodes = orderedShortestPath(endNode)


    for (let i = 0; i < visitedNodes.length; i++) {
      const node = visitedNodes[i];

      setTimeout(() => {
        if (!node.isStart) document.getElementById(`node-${node.row}-${node.col}`).className = 'node-visited'
        if (i == visitedNodes.length - 1) {
          for (let i = 1; i < orderedNodes.length - 1; i++) {
            setTimeout(() => {
              const node = orderedNodes[i];
              document.getElementById(`node-${node.row}-${node.col}`).className = 'node-path';
            }, 50 * i);
          }
        }
      }, 10 * i);
    }
  }


  componentDidMount() {
    const grid = generateGrid(this.state.startCoordinates, this.state.endCoordinates, this.walls)
    this.setState({ grid })
  }


  onWallClicked() {
    const { isWallClicked } = this.state;
    this.isWall = !this.isWall
    this.setState({ isWallClicked: !isWallClicked })
  }


  // render 
  render() {
    const { grid, isWallClicked } = this.state;
    return (
      <div className="App">
        <div className="upper" onClick={this.demo}>
          <h1 style={{ color: 'white' }}><span style={{ color: '#00a6e7' }}>ShortestPath</span>Visualiser</h1>
        </div>

        <div style={{ marginTop: '10px' }}>
          <button className="sortButton" onClick={this.visualisDijkstra}>Visualise (Dijkstra's)</button>
          <button className={isWallClicked ? 'sortButtonClicked' : 'sortButton'} onClick={this.onWallClicked}>Add Wall</button>
        </div>



        <div className="grid">
          {
            grid.map((nodeRow, rowIndex) => {
              return (<div className="row" key={rowIndex}>
                {
                  nodeRow.map((node, colIndex) => {
                    const { isStart, isFinish, row, col, isWall } = node;
                    return (<div onClick={() => this.onNodeClicked(row, col)} className="column" key={colIndex}>
                      <Node
                        key={colIndex}
                        isStart={isStart}
                        isFinish={isFinish}
                        row={row}
                        col={col}
                        isWall={isWall}
                      />
                    </div>)
                  })
                }
              </div>)
            })
          }
        </div>


      </div>
    );
  }


}

export default App;



const generateGrid = (start, end, walls) => {
  const grid = [];
  [...Array(20)].map((_, r) => {
    const row = [];
    [...Array(40)].map((_, c) => {
      if (walls[`${r},${c}`] != null) {
        console.log("includes")
        let newNode = createNodeWall(r, c, start, end);
        row.push(newNode)
      } else {
        let newNode = createNode(r, c, start, end);
        row.push(newNode)
      }
    })
    grid.push(row)
  })

  return grid
}



// create a node
const createNode = (row, col, start, end) => {
  const Node = {
    col: col,
    row: row,
    distance: Infinity,
    isStart: row === start[0] && col === start[1],
    isFinish: row === end[0] && col === end[1],
    isWall: false,
    isVisited: false,
    previousNode: null,
  }
  return Node
}

// create a node wall 
const createNodeWall = (row, col, start, end) => {
  const Node = {
    col: col,
    row: row,
    distance: Infinity,
    isStart: row === start[0] && col === start[1],
    isFinish: row === end[0] && col === end[1],
    isWall: true,
    isVisited: false,
    previousNode: null,
  }
  return Node
}

// get start node and end node
const getStartNode = (row, col, grid) => {
  const Node = grid[row][col]
  return Node
}
const getEndNode = (row, col, grid) => {
  const Node = grid[row][col]
  return Node
}