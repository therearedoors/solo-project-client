const whiteKingSquares = ['a1','b1','c1','d1','e1','f1','g1','h1']
const blackKingSquares = ['a8','b8','c8','d8','e8','f8','g8','h8']
const squares = Array(8)
for (let i=0;i<8;i++){
  squares[i] = Array(8).fill(i);
}

const columns = ["a","b","c","d","e","f","g","h"]

const board = () => {
    const newBoard = squares.map((_,i,cols)=>{
    const row = 8-i
    return cols[i].map((_,j)=>columns[j]+row)
    }).flat().reduce((obj,val) => ({...obj, [val]:null}),{})
    return newBoard
}

let gameStartUp = false
let gameInProgress = false
let lobbyFull = false
let currentBoard = board()
let currentGameRoute

export function startGame(){
    gameStartUp = true
    emitChange()
    gameInProgress = true
    return currentGameRoute
}

export async function joinGame(route){
    gameStartUp = false
    currentGameRoute = route
    const gameToJoin = await fetch(`http://localhost:3030/game/${route}`)
    .then(res => res.json())
    gameInProgress = true
    currentBoard = gameToJoin.gameState
    emitChange()
}

export async function updateGame(route){
    const updatedBoard = await fetch(`http://localhost:3030/game/${route}`)
    .then(res => res.json())
    currentBoard = updatedBoard.gameState
    emitChange()
}

export function quitGame(){
    gameInProgress = false
}

let observer = null
  
 export async function emitChange() {
    if (gameStartUp){
        const newGameRoute = Math.random().toString(36).replace(/[^a-z]+/g, '')
        const newBoard = await fetch(`http://localhost:3030/game/${newGameRoute}`, {method:'POST'})
        .then(res => res.json())
        currentBoard = newBoard.gameState
        currentGameRoute = newGameRoute
        gameStartUp = false
    }
    else if (gameInProgress) {
    kingPawns(currentBoard)
    const data = {gameState: currentBoard}
    const updatedBoard = await fetch(`http://localhost:3030/game/${currentGameRoute}`, {method: 'PUT', headers: {
        'Content-Type': 'application/json'
      }, body: JSON.stringify(data)})
    .then(res => res.json())
    currentBoard = updatedBoard.gameState
    }
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
 
export function observe(receive) {
    if (observer) {
        if(lobbyFull){
            throw new Error('Multiple observers not implemented.')
        }
        lobbyFull = true
       }
    observer = receive
    emitChange()
}

function toNumCoord(letterCoord){
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