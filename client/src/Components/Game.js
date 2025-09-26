import { useEffect, useState } from "react";
import GameWon from "./GameWon";
import GameLost from "./GameLost";


// The game component handles the status of the game
// and passes props to GameWon/GameLost & Sounds components
function Game(props) {
  //useState varaibles won/lost are booleans that will change on the games outcome
  // and toggle display of gamewon or lost Bootstrap modals
  const [won, setWon] = useState(false);
  const [lost, setLost] = useState(false);

  let gameOver = props.gameOver; // boolean is gameOver
  let setGameOver = props.setGameOver; 
  let guessLeft = props.guessLeft;// the remaining guesses the user has
  let gameRound = props.gameRound; // the game round
  let setGameRound = props.setGameRound; // the set game round  
  let setPlaying = props.setPlaying; // the set playing function
  //console.log(gameRound);

  function toggleWon() {
    setWon(!won);
  }
  function toggleLost() {
    setLost(!lost);
  }

  // useEffect is used to set the useState variables
  useEffect(() => {
    if (guessLeft === 0) {
      setGameOver({status:true,result:false});
      // if no guesses left
      setLost(true); // user has lost
    } else if (guessLeft > 0 && gameOver.result === true) {
      // user has guesses left & guessed all words or letters
      setWon(true); // user has won
    } 
  }, [guessLeft,gameOver.result,setGameOver]); 
  // useEffect is called on changes to guesses remaining, boolean test, and input


  // finally we return the modals only if the respective boolean useState variables are true
  return (
    <>
      {(won)? <GameWon won={won} toggleWon={toggleWon} setPlaying={setPlaying} gameRound={gameRound} setGameRound={setGameRound} setGameOver={setGameOver}/> : null}
      {lost ? <GameLost lost={lost} toggleLost={toggleLost} gameRound={gameRound} setPlaying={setPlaying} setGameOver={setGameOver}/> : null}
    </>
  );
}

export default Game;
