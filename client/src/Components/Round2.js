import { connect } from "react-redux";
// we import the below components to pass props to them
import { useState } from "react";
import HangmanImage from "./HangmanImage";
import HandleGame from "./HandleGame";
import InputForm from "./InputForm";
import CheckDictionary from "./CheckDictionary";
import Notification from "./Notification";
import Game from "./Game";
import IncorrectGuesses from "./IncorrectGuesses";

// mapStateToProps so we can access the word in the store state
function mapStateToProps(state) {
return {
    game: state,
};
}


function Round2(props) {
  // pass the store state to props
    const [notification, setNotification] = useState({
            "message": "",
            "type": "",
            "time": 0,
        }); // notification state

    let word = props.game[0].item.word; // the word in the store

    let gameOver = props.gameOver;
    let setGameOver = props.setGameOver;
    let playing = props.playing;
    let setPlaying = props.setPlaying;
    let gameRound = props.gameRound;
    let setGameRound = props.setGameRound;
    let mute = props.mute;


    // for the handle change we only want this on click or enter
    function handleChange(event) {
        let input = event.target.value;
          // we update the object with guess = input & showList = 1
        HandleGame(input,playing.letter,1,playing.guessList,playing.guessLeft,setPlaying
        );
        }

    function userGuess(){
      if(playing.guess===""){
        setNotification({"message": "Error! Cannot process blank guess!!", "type": "error", "time": 2});
      }else{
      let guessArray = playing.guessList; // array of all guesses
      guessArray.push(playing.guess);
      let newGuess = playing.guess;
      let boolArray = []; // array of booleans  
      newGuess = newGuess.toLowerCase().replaceAll(" ", "");// remove blank space
      let wordArray = newGuess.split(""); // the word in an array

      // if the letters from this word are/not in the array push respective boolean value
      wordArray.forEach((letter) => {
        if(word.includes(letter)){
          boolArray.push(true);
        }else{
          boolArray.push(false);
        }
      });
      // chack word exists in dictionary
      CheckDictionary(newGuess).then((response) => {
        if(response===true&&!boolArray.includes(false)){
          // if the word is in the dictionary and uses all correct letters
          guessArray.pop();
          HandleGame("",playing.guess,playing.showList,guessArray,playing.guessLeft,setPlaying);
          setGameOver({status:true,result:true})
          // end of game
        }
        else if(response===true&&boolArray.includes(false)){
          // if the word is in the dictionary but the letters used in the guess are not in the word
          setNotification({"message": "This guess is not in the word! Please try again!", "type": "error", "time": 2});
          HandleGame("",playing.guess,playing.showList,guessArray,playing.guessLeft-1,setPlaying);
        }else{
          // if the word is not in the dictionary
          setNotification({"message": "This word is not in the dictionary! Please try again!", "type": "error", "time": 2});
          HandleGame("",playing.guess,playing.showList,guessArray,playing.guessLeft-1,setPlaying);
        }
      });
    }
    }

  return (
    <>
    {(notification.time>0)?<Notification message={notification.message} type={notification.type} time={notification.time} setNotification={setNotification}/>:<h1 className="shadow" id="game-word">{word}</h1>}
    <Game
        guessLeft={playing.guessLeft}
        gameRound={gameRound}
        setGameRound={setGameRound}
        setPlaying={setPlaying}
        setGameOver={setGameOver}
        gameOver={gameOver}
        mute={mute}
        />
    
    <HangmanImage num={playing.guessLeft} />
    <div className="shadow">You have {playing.guessLeft} guesses left!</div>
    <InputForm gameOver={gameOver} handleChange={handleChange} userGuess={userGuess} guessLength={"30"} guess={playing.guess} gameRound={gameRound}/>
    {playing.showList === 1 ?  <IncorrectGuesses guesses={playing.guessList}/>: null}

    
    </>
    
  )
}

export default connect(mapStateToProps)(Round2);