import {React} from 'react'
import { ItemTypes } from './Constants'
import { useDrag } from 'react-dnd'
import whitePawn from './assets/white/pawn.png';
import blackPawn from './assets/black/pawn.png';
import whiteKing from './assets/white/king.png';
import blackKing from './assets/black/king.png';


export default function Piece ({pieceData, coords}) {

  const [{isDragging}, drag] = useDrag(() => ({
    type: ItemTypes[pieceData],
    item: {coords: coords,
           pieceData: pieceData},
    collect: monitor => {
      return {
      isDragging: !!monitor.isDragging()
    }}
  })
  )

let pieceSrc
let altText

    switch (pieceData){
      case 3:
        pieceSrc = blackKing;
        altText = 'Black King'
        break;
      case 2:
        pieceSrc = blackPawn;
        altText = 'Black Pawn'
        break;
      case 1:
        pieceSrc = whiteKing;
        altText = 'White King'
        break;
      case 0:
        pieceSrc = whitePawn;
        altText = 'White Pawn'
        break;
      default:
        throw Error(`no src for piece "${pieceData}" in place`)
    }

    return <img ref={drag} style={{transform: 'translate(0, 0)', opacity: isDragging ? 0.5 : 1}} src={pieceSrc} className={'piece'} alt={altText} ></img>
}