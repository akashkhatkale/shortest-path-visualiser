
import React, { Component } from 'react'
import './Node.scss'

export default class Node extends Component {
    render() {
        const { isFinish, isStart, row, col, isWall } = this.props
        const extraClassName = isWall ? 'wall' : isFinish ? 'finish' : isStart ? 'start' : 'default'
        return (
            <div id={`node-${row}-${col}`} className={`node-${extraClassName}`}>
            </div>
        )
    }
}