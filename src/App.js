import React from 'react';
import Board from './Board.js'
 
export default function App ({positions}) {
    return (
      <div className="game">
        <div className="game-board">
          <Board positions ={positions}/>
        </div>
        <div className="game-info">
          <div>{/* status */}</div>
          <ol>{/* TODO */}</ol>
        </div>
      </div>
    );
}