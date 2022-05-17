import {React, useState} from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';

function Square ({value}) {
    const [val,setVal]=useState(value)
    return ( 
        <button className={"square"} onClick={function() {setVal('X')}}>{val}</button>);
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
          const row = i+1
          return <div key={row} className="board-row">
              {squares[i].map((_,j)=>(
                  <Square key={cols[j]+row} value={cols[j]+row}/>
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