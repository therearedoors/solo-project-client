const initWhite = ['b8','d8','f8','h8','a7','c7','e7','g7','b6','d6','f6','h6']
const initBlack = ['a3','c3','e3','g3','b2','d2','f2','h2','a1','c1','e1','g1']
const whiteKingSquares = ['a1','b1','c1','d1','e1','f1','g1','h1']
const blackKingSquares = ['a8','b8','c8','d8','e8','f8','g8','h8']
const squares = Array(8)
for (let i=0;i<8;i++){
  squares[i] = Array(8).fill(i);
}

let gameStartUp = true
let currentBoard

const board = () => squares.map((_,i)=>{
    const cols = ["a","b","c","d","e","f","g","h"]
    const row = 8-i
    return squares[i].map((_,j)=>cols[j]+row)
}).flat().reduce((obj,val) => ({...obj, [val]:null}),{})

let observer = null
  
  function emitChange() {
    if (gameStartUp){
        currentBoard = board()
        initWhite.forEach(position => {currentBoard[position] = 0})
        initBlack.forEach(position => {currentBoard[position] = 2})
        gameStartUp = false
    }
    kingPawns(currentBoard)
    observer(currentBoard)
}

function kingPawns(board) {
    for (const square of whiteKingSquares) {
        if (board[square] === 0) board[square] = 1
    }
    for (const square of blackKingSquares) {
        if (currentBoard[square] === 2) currentBoard[square] = 3
    }
}
 
export function observe(o) {
    if (observer) {
      throw new Error('Multiple observers not implemented.')
    }
  
    observer = o
    emitChange()
}

function toNumCoord(letterCoord){
    console.log(letterCoord)
    return letterCoord.codePointAt(0)
}

function pieceAdjacentToPawn(x,y,dx,dy){
    const squareIsOccupied = coords => {
        switch (currentBoard[coords]) {
            case null:
                return null
            case 0: case 1:
                return 'white'
            case 2: case 3:
                return 'black'
            default:
                throw Error(`unrecognised pieceCode "${currentBoard[coords]}"`)
        }
    }
    if (dx > 0 && dy > 0) return squareIsOccupied(String.fromCodePoint(x+1)+(y+1))
    if (dx < 0 && dy > 0) return squareIsOccupied(String.fromCodePoint(x-1)+(y+1))
    if (dx > 0 && dy < 0) return squareIsOccupied(String.fromCodePoint(x+1)+(y-1))
    if (dx < 0 && dy < 0) return squareIsOccupied(String.fromCodePoint(x-1)+(y-1))
    return [false]
}

export function canMovePawn(val, x, y, toX, toY){
    const xNumber = toNumCoord(x)
    const toXNumber = toNumCoord(toX)
    const dx = toXNumber - xNumber
    const dy = toY - y
    const adjacentPiece = pieceAdjacentToPawn(xNumber,y,dx, dy)
    if (val === 2){
    return ((((dx === -1 && dy === 1) || (dx === 1 && dy === 1)) && adjacentPiece === null) ||
    (((dx === -2 && dy === 2) || (dx === 2 && dy === 2)) && adjacentPiece === 'white' && currentBoard[toX+toY] === null))
    }
    else if (val === 0){
        return ((((dx === 1 && dy === -1) || (dx === -1 && dy === -1)) && adjacentPiece === null) ||
        (((dx === 2 && dy === -2) || (dx === -2 && dy === -2)) && adjacentPiece === 'black' && currentBoard[toX+toY] === null))
    }
    return false
}

export function movePawn(val, x, y, toX, toY) {
    const xNumber = toNumCoord(x)
    const toXNumber = toNumCoord(toX)
    const dx = toXNumber - xNumber
    const dy = toY - y
    if (Math.abs(dy) === 2) {
    if (dx > 0 && dy > 0) currentBoard[String.fromCodePoint(xNumber+1)+(y+1)] = null
    if (dx < 0 && dy > 0) currentBoard[String.fromCodePoint(xNumber-1)+(y+1)] = null
    if (dx > 0 && dy < 0) currentBoard[String.fromCodePoint(xNumber+1)+(y-1)] = null
    if (dx < 0 && dy < 0) currentBoard[String.fromCodePoint(xNumber-1)+(y-1)] = null
    }
    currentBoard[x+y] = null;
    currentBoard[ toX + toY ] = val
    emitChange()
}

export function canMoveKing(val, x, y, toX, toY){
    const xNumber = toNumCoord(x)
    const toXNumber = toNumCoord(toX)
    const dx = toXNumber - xNumber
    const dy = toY - y
    const adjacentPiece = pieceAdjacentToPawn(xNumber,y,dx,dy)
    return ((Math.abs(dx) === 1 && Math.abs(dy) === 1) && !adjacentPiece) ||
    ((Math.abs(dx) === 2 && Math.abs(dy) === 2) && adjacentPiece && currentBoard[toX+toY] === null)
}
  
export function moveKing(val, x, y, toX, toY) {
    const xNumber = toNumCoord(x)
    const toXNumber = toNumCoord(toX)
    const dx = toXNumber - xNumber
    const dy = toY - y
    if (Math.abs(dy) === 2) {
    if (dx > 0 && dy > 0) currentBoard[String.fromCodePoint(xNumber+1)+(y+1)] = null
    if (dx < 0 && dy > 0) currentBoard[String.fromCodePoint(xNumber-1)+(y+1)] = null
    if (dx > 0 && dy < 0) currentBoard[String.fromCodePoint(xNumber+1)+(y-1)] = null
    if (dx < 0 && dy < 0) currentBoard[String.fromCodePoint(xNumber-1)+(y-1)] = null
    }
    currentBoard[x+y] = null;
    currentBoard[ toX + toY ] = val
    emitChange()
  }