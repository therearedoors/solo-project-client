import {React, useState,useEffect} from 'react';
import Board from './Board.js'
import {startGame,joinGame,updateGame} from './Game'

 
export default function App ({positions}) {

  const [games,setGames] = useState([])
  const [currentGame, setCurrentGame] = useState("")
  const [gameNumber, setGameNumber] = useState(NaN)

  async function handleCreate(e){
    const newGame = await startGame()
    setGames(games => [...games, newGame])
    setCurrentGame(newGame)
  }

  function handleJoin(e){
    const text = e.target.innerText
    const route = games[text[text.length-1]-1]
    setGameNumber(text[text.length-1])
    setCurrentGame(route)
    joinGame(route)
  }

  useEffect(()=>{
    if (currentGame){
    setTimeout(()=>{updateGame()},1200);
    }
    },[currentGame])

  useEffect(() => {
    fetch(`http://localhost:3030/game/`)
            .then(res => res.json())
            .then(json => setGames(json.games))
  },[])

  return (
      <div className="game">
        <div className="game-board">
          <Board positions ={positions} currentGame={currentGame} gameNumber={gameNumber}/>
        </div>
        <div className="game-info">
          <button className="create-game-btn button-style" onClick={handleCreate}>Create Game</button>
          <ul className="game-list">{games.map((_,index) => {
          console.log(_)
          return <li key={_}><button className="join-game-btn button-style" onClick={handleJoin}>{`Join Game ${index+1}`}</button></li>})}</ul>
        </div>
      </div>
    );
}