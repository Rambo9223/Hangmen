import { connect } from "react-redux";
// we import the below components to pass props to them
import WordDisplay from "./WordDisplay";
import HangmanImage from "./HangmanImage";
import Game from "./Game";
import MapGuesses from "./MapGuesses";
import ToggleRestart from "./ToggleRestart";
import HandleGame from "./HandleGame";
import initalState from "./initialState.json";
import InputForm from "./InputForm";
//import testword from "./testword.json"
import { useState } from "react";
import Notification from "./Notification";


// mapStateToProps so we can access the word in the store state
function mapStateToProps(state) {
return {
    game: state,
};
}

function Round1(props) {
// pass the store state to props
// the useState variable playing is initialised with the initialState object
const [notification, setNotification] = useState({
            "message": "",
            "type": "",
            "time": 0,
        }); // notification state

let gameOver = props.gameOver;
let setGameOver = props.setGameOver;
let playing = props.playing;
let setPlaying = props.setPlaying;
const gameRound = props.gameRound;
const setGameRound = props.setGameRound; 
let mute = props.mute;
// if there is a game in the store/props
if (props.game !== undefined || props.testing !== undefined) {

    //if there is a word in the store state, i.e new game is clicked
    const word = props.game[0].item.word // the word in the store

    
    // this function handles the letter the user inputs to the text input below
    function handleChange(event) {
    let input = event.target.value;
      // we update the object with guess = input & showList = 1
    HandleGame(input,playing.letter,1,playing.guessList,playing.guessLeft,setPlaying
    );
    }

    //user Guess is called on click of the guess button
    function userGuess() {
    let regex = /^[a-z]+$/.test(playing.guess);

    if(playing.guess===""){
        //guess is blank, throw error
        setNotification({"message": "Error! Cannot process blank guess!!", "type": "error", "time": 2});
    }else {
        
      let send = word.includes(playing.guess); // boolean of (word.includes(guess))

      let guessArray = playing.guessList; // array of all guesses

      guessArray.push(playing.guess); // push new guess to array

      let check = [];// check array holds boolean values for each guess

      // for each guess
      word.split("").forEach((item)=>{
        if(guessArray.includes(item)){
            check.push(item);
        };//push the guess to the check array if in 
        if(check.length===word.split("").length){
            //set gameOver to true
            setGameOver({status:true,result:true});
        }
      })

      let letter = playing.guess; // secondary variable of guess
      // we use this so we can send props to other components onclick of guess button


      if(playing.guess !== "" && playing.guessList.filter((item) => item === playing.guess).length > 1 && send === true) {
        setNotification({"message": "Error! Cannot process duplicate guess!", "type": "error", "time": 2});
        //guess isnt blank and is in guessList
        guessArray.pop(); // remove duplicate guess from array
        HandleGame("",letter,playing.showList,guessArray,playing.guessLeft,setPlaying
        );
        
    }
    else if (playing.guess !== "" && send === true) {
        //guess isnt blank and is in word
        // update guess, letter and guessArray
        HandleGame("",letter,playing.showList,guessArray,playing.guessLeft,setPlaying
        );
    } 
    else if(playing.guess !== "" && playing.guessList.filter((item) => item === playing.guess).length > 1) {
        setNotification({"message": "Error! Cannot process duplicate guess!", "type": "error", "time": 2});
        guessArray.pop(); // remove duplicate guess from array
        HandleGame("", letter, playing.showList, guessArray, playing.guessLeft, setPlaying);
        //guess isnt blank and is in guessList
        
    } 
    else if(regex===false){
        setNotification({"message": "Error! Guesses must not contain symbols or uppercase letters!", "type": "error", "time": 2});
        guessArray.pop(); // remove duplicate guess from array
        HandleGame("", letter, playing.showList, guessArray, playing.guessLeft, setPlaying);
        //guess isnt blank and is in guessList
    }
    else if (playing.guess !== "" && send === false) {
        //guess isnt blank and isn't in word
        let num = playing.guessLeft - 1; // reduce number of guesses left by 1

        // update guess, letter, guessArray & guessLeft
        HandleGame("", letter, playing.showList, guessArray, num, setPlaying);
    }
    
}
    }

   

    return (
    <>
        {(notification.time>0)?<Notification message={notification.message} type={notification.type} time={notification.time} setNotification={setNotification}/>:
        <WordDisplay
        word={word}
        letter={playing.letter}
        game={playing.guessLeft}
        guessList={playing.guessList}
        />}
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
        {playing.showList === 1 ? <MapGuesses word={word} guessArray={playing.guessList} /> : null}
        <div className="shadow">You have {playing.guessLeft} guesses left!</div>
        <InputForm gameOver={gameOver} handleChange={handleChange} userGuess={userGuess} guessLength={"1"} guess={playing.guess} />
        <ToggleRestart setPlaying={setPlaying} initalState={initalState.round1} setGameOver={setGameOver}/>

        
    </>
    );
}
}

export default connect(mapStateToProps)(Round1);
