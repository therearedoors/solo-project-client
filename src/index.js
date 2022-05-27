import {React, useEffect, useState} from 'react';
import ReactDOM from 'react-dom/client';
import Piece from './Piece.js';
import whitePawn from './assets/white/pawn.png';
import blackPawn from './assets/black/pawn.png';
//import pawn from './assets/white/pawn.png';
import './index.css';

function Square ({shade, value}) {

  const init = ['b8','d8','f8','h8','a7','c7','e7','g7','b6','d6','f6','h6']
  const initBlack = ['a3','c3','e3','g3','b2','d2','f2','h2','a1','c1','e1','g1']

    return ( 
        <button className={`square shade${shade}`}>
          {init.includes(value) && <Piece value={value} piece={whitePawn}/>}
          {initBlack.includes(value) && <Piece value={value} piece={blackPawn}/>}
        </button>);
  }
  
function Board () {
    const status = 'Next player: X';
    const squares = Array(8);
    for (let i=0;i<8;i++){
        squares[i] = Array(8).fill(i);
    }
      return (
        <div>
          <div className="status">{status}</div>
          {squares.map((_,i)=>{
          const cols = ["a","b","c","d","e","f","g","h"]
          const row = 8-i
          return <div key={row} className="board-row">
              {squares[i].map((_,j)=>(
                  <Square key={cols[j]+row} shade={`${i%2===0?j%2:(j+1)%2}`} value={cols[j]+row}/>
              ))}
                </div>
            })}
        </div>
      );
  }
  
  function Game () {
      return (
        <div className="game">
          <div className="game-board">
            <Board />
          </div>
          <div className="game-info">
            <div>{/* status */}</div>
            <ol>{/* TODO */}</ol>
          </div>
        </div>
      );
  }
  
  // ========================================
  
  const root = ReactDOM.createRoot(document.getElementById("root"));
  root.render(<Game />);