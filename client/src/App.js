//Our app file contains our css imports for bootstrap & components
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import './mobile.css';
import Heading from './Components/Heading';
import { useState } from 'react';
import initalState from "./Components/initialState.json";
import Round1 from './Components/Round1';
import Round2 from './Components/Round2';
import Round3 from './Components/Round3';
import ROUNDS_4_5 from "./Components/Rounds_4_5";
import EndOfGame from './Components/EndOfGame';
import Sounds from './Components/Sounds';
import Backgrounds from './Components/Backgrounds';
import HangmanImage from './Components/HangmanImage';

function App() {
  const [gameRound, setGameRound] = useState(0);
  const [playing, setPlaying] = useState(initalState.round1);
  const [gameOver,setGameOver] = useState({status:false,result:false});
  const [mute,setMute] = useState(false);
  
  
  
  return (
    <>
    <Backgrounds gameRound={gameRound}/>
    <div className='App-header'>
    <Heading gameRound={gameRound} gameOver={gameOver} setPlaying={setPlaying} setGameRound={setGameRound} setGameOver={setGameOver} mute={mute} setMute={setMute}/>{/*About the game */}
    {gameRound===0?<HangmanImage num={1}/>:null}
    {(gameRound===1)?<Round1 playing={playing} setPlaying={setPlaying} gameRound={gameRound} setGameRound={setGameRound} gameOver={gameOver} setGameOver={setGameOver} mute={mute}/>:null}
    {(gameRound === 2) ? <Round2 playing={playing} setPlaying={setPlaying} gameRound={gameRound} setGameRound={setGameRound} gameOver={gameOver} setGameOver={setGameOver} mute={mute}/> : null}
    {(gameRound===3)? <Round3 playing={playing} setPlaying={setPlaying} gameRound={gameRound} setGameRound={setGameRound} gameOver={gameOver} setGameOver={setGameOver} mute={mute}/>:null}
    {(gameRound===4)? <ROUNDS_4_5 playing={playing} setPlaying={setPlaying} gameRound={gameRound} setGameRound={setGameRound} gameOver={gameOver} setGameOver={setGameOver} mute={mute}/>:null}
    {(gameRound===5)? <ROUNDS_4_5 playing={playing} setPlaying={setPlaying} gameRound={gameRound} setGameRound={setGameRound} gameOver={gameOver} setGameOver={setGameOver} mute={mute}/>:null}
    {(gameRound===6)?<EndOfGame gameRound={gameRound} gameOver={gameOver} mute={mute}/>:null}
    {(gameRound>0)?<Sounds gameOver={gameOver} gameRound={gameRound} mute={mute}/>:null}
    </div>
    </>
  );
}



export default App;
