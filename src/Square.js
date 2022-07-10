import React from 'react'
import Piece from './Piece.js';
import Overlay from './Overlay.js'
import {canMoveKing, canMovePawn, moveKing, movePawn} from './Game.js'
import { ItemTypes} from './Constants.js'
import { useDrop } from 'react-dnd'

export default function Square ({isDark, pieceData, edges, x, y}) {
    let [col,row] = edges
    if (isNaN(col)) {
        row=col
        col=null
    }

    const isPawn = item => item.pieceData === 0 || item.pieceData === 2
    const isKing = item => item.pieceData === 1 || item.pieceData === 3

    const [{ isOver, canDrop}, drop] = useDrop(
        () => ({
          accept: [ItemTypes[0], ItemTypes[1], ItemTypes[2], ItemTypes[3]],
          canDrop: item => {
            const pieceXPosition = item.coords[0]
            const pieceYPosition = Number(item.coords[1])
            if (isPawn(item)) return canMovePawn(item.pieceData,pieceXPosition,pieceYPosition,x,y)
            if (isKing(item)) return canMoveKing(item.pieceData,pieceXPosition,pieceYPosition,x,y)
            return false
          },
          drop: item => {
            const pieceXPosition = item.coords[0]
            const pieceYPosition = Number(item.coords[1])
            if (isPawn(item)) return movePawn(item.pieceData,pieceXPosition,pieceYPosition,x,y)
            if (isKing(item)) return moveKing(item.pieceData,pieceXPosition,pieceYPosition,x,y)
            return false
          },
          collect: (monitor) => ({
            isOver: !!monitor.isOver(),
            canDrop: !!monitor.canDrop()
          })
        }),
        [x, y]
      )

    const squareColour = Number(isDark) === 0 ? '#769656' : '#eeeed2'

      return (
          <button className={'square'} style={ {
              backgroundColor: squareColour,
              position: 'relative'
          }} ref={drop}>
            {pieceData !== null && <Piece pieceData={pieceData} coords={x+y}/>}
            {col && <span className={'corner-row'}>{col}</span>}
            {row && <span className={'corner-col'}>{row}</span>}
            {/* {isOver && !canDrop && <Overlay colour="red" />} */}
            {!isOver && canDrop && <Overlay colour="yellow" />}
            {isOver && canDrop && <Overlay colour="green" />}
          </button>);
    }