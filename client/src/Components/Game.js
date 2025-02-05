import * as Icon from "react-bootstrap-icons";
import DisplayModalAuto from "./DisplayModalAuto";
import { useEffect, useState } from "react";
import React from "react";
import winner from "../Images/winner.jpg";
import looser from "../Images/game_over.jpg";

let checker = []; // checker is our array we push correct guesses to

function Game(props) {
  //useState varaibles won/lost are booleans that will change on the games outcome
  // and toggle display of gamewon or lost Bootstrap modals
  const [won, setWon] = useState(false);
  const [lost, setLost] = useState(false);

  let word = props.word; // the state value word
  let guesses = props.guesses; // the user guess
  let game = props.game; // the game count
  let remaining = props.remaining; // the remaining guesses the use has
  let input = document.getElementById("user-input");//html text input box

  if (game === 0) {
    // reset checker on new or restarted game
    checker = [];
  }


  let gameWord = String(word); // the string of the passed word
  let wordArray = gameWord.split(""); // the word split in to an array

  /* toggle Won & Lost will change the boolean of the usestate variables
    these functions are used to close the modals that pop up when the game is won/lost. */
  function toggleWon() {
    setWon(!won);
  }
  function toggleLost() {
    setLost(!lost);
  }

  /* Check function uses a simple test (length of wordArray equals the length of checker array)
    to call the appropriate function to determine the outcome of the game. 
    Check is called every time the user inputs a letter. 
    */
  function Check() {
    let test = Boolean(wordArray.length === checker.length);
    if (test === true && remaining > 0) {
      input.style.display="none";//remove text input on win
    } else if (remaining === 0) {
      // user has no more guesses
      input.style.display="none";//remove text input on loss
    }
  }

  // the wordArray contains the user guess and the checker array does not
  if (wordArray.includes(guesses) && !checker.includes(guesses)) {
    wordArray.forEach((item) => {
      // for each letter in the word
      if (item === guesses) {
        // if the word letter equals the guess letter
        checker.push(guesses); // push guess in to the checker array
        Check(); // call check
      }
    });
  } else {
    Check(); // call check
  }

  let test = Boolean(wordArray.length === checker.length);
  // useEffect is used to set the useState variables
  useEffect(() => {
    if (remaining === 0) {
      // if no guesses left
      setLost(true); // user has lost
    } else if (remaining > 0 && test === true) {
      // user has guesses left & guessed all letters
      setWon(true); // user has won
    } else if (input !== null && test === false){
      //if user plays a second game after win/loss
      //this resets the html text input so it can be used 
      input.style.display = "inline";
    }
  }, [remaining,test,input]); 
  // useEffect is called on changes to guesses remaining, boolean test, and input

  // if the game is won we return a modal that tells them this
  function GameWon() {
    let title = <>You've Won! <Icon.TrophyFill /></>;
    let body = <><img src={winner} alt="winner" height={"208px"} width={"308px"} />
    <br></br>
    Would you like to start a new game?</>
    return (
      <>
        <div className="game-won">
          <DisplayModalAuto body={body} title={title} show={won} handleClose={toggleWon} />
        </div>
      </>
    );
  }

  // if game is lost we return a modal to tell them this
  function GameLost() {
    let body = <><img src={looser} alt="lost" width={"314px"} height={"225px"} />
    <br></br>
    You can start a new game? Or Restart this game?</>
    return (
      <>
        <div className="game-lost">
          <DisplayModalAuto body={body} title={"You've Lost! "} show={lost} handleClose={toggleLost} />
        </div>
      </>
    );
  }
  // finally we return the modals only if the respective boolean useState variables
  // are true, this happens above in the useEffect function
  return (
    <>
      {won ? <GameWon /> : null}
      {lost ? <GameLost /> : null}
    </>
  );
}

export default Game;
