import React from 'react'
import Square from './Square.js'
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'

const isEven = num => num%2===0
  
export default function Board ({positions,currentGame,gameNumber}) {
let status
  if (currentGame) status = `Game ${gameNumber}`
  else status = "Create or join a game.";
    const squares = Array(8);

    function getBoardIndex(col,row){
      let idx = ""
      if (col === 'a') idx+=row
      if (row === 1) idx+=col
      return idx
    }

    for (let i=0;i<8;i++){
        squares[i] = Array(8).fill(i);
    }
      return (
        <div>
          <div className="status">{status}</div>
          <DndProvider backend={HTML5Backend}>
          {squares.map((_,i)=>{
          const cols = ["a","b","c","d","e","f","g","h"]
          const row = 8-i
          return <div key={row} className="board-row">
              {squares[i].map((_,j)=>{
                  const key = cols[j]+row
                  return <div key={key}><Square isDark={`${isEven(i)?j%2:(j+1)%2}`} pieceData={positions[key]} edges={getBoardIndex(cols[j],row)} x={cols[j]} y={row}/></div>
          })}
                </div>
            })}
          </DndProvider>
        </div>
      );
  }