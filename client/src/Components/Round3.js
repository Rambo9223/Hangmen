import { connect } from "react-redux";
import { useState } from "react";
import HangmanImage from "./HangmanImage";
import HandleGame from "./HandleGame";
import InputForm from "./InputForm";
import CheckDictionary from "./CheckDictionary";
import Notification from "./Notification";
//import Game2 from "./Game2";
import Game from "./Game";
import IncorrectGuesses from "./IncorrectGuesses";

// mapStateToProps so we can access the word in the store state
function mapStateToProps(state) {
return {
    game: state,
};
}


function Round3(props) {
  // pass the store state to props
    const [notification, setNotification] = useState({
            "message": "",
            "type": "",
            "time": 0,
        }); // notification state
        
    //console.log(props);
    let word = props.game[0].item.word // the word in the store
    
    let gameOver = props.gameOver;
    let setGameOver = props.setGameOver;
    let playing = props.playing;
    let setPlaying = props.setPlaying;
    let gameRound = props.gameRound;
    let setGameRound = props.setGameRound;
    let mute = props.mute;

    // comments kain
    function handleChange(event) {
        let input = event.target.value;
        HandleGame(input,playing.letter,1,playing.guessList,playing.guessLeft,setPlaying
        );
        }

    function userGuess(){
      if(playing.guess===""){
        setNotification({"message": "Error! Cannot process blank guess!!", "type": "error", "time": 2});
      }else{
      let guessArray = playing.guessList; // array of all guesses
      let newGuess = playing.guess;
      guessArray.push(newGuess);
      newGuess = newGuess.toLowerCase().replaceAll(" ", "");
      let testLetter = word.endsWith(newGuess.charAt(0));
      let testLength = newGuess.length >= word.length-2;

      // word not in dictionary && word has wrong start letter && word is too short

      // word not in dictonary & start letter wrong
      
      CheckDictionary(newGuess).then((response) => {
        if(response===true&&testLength===true&&testLetter===true){
          // if the word is in the dictionary and uses all correct letters
          guessArray.pop();
          HandleGame("",playing.guess,playing.showList,guessArray,playing.guessLeft,setPlaying);
          setGameOver({status:true,result:true});          
        }
        else if(response===true&&testLength===false&&testLetter===true){
          // if the word is in the dictionary but the guess length is too short
          setNotification({"message": "This guess is in the dictionary but is too short! Please try again!", "type": "error", "time": 3});
          HandleGame("",playing.guess,playing.showList,guessArray,playing.guessLeft-1,setPlaying);
        }else if(response===false&&testLength===true&&testLetter===true){
          // if the word is not in the dictionary
          setNotification({"message": "This word is not in the dictionary! Please try again!", "type": "error", "time": 3});
          HandleGame("",playing.guess,playing.showList,guessArray,playing.guessLeft-1,setPlaying);
        }else if(response===true&&testLength===true&&testLetter===false){
        setNotification({"message": "This word doesn't start with the original words last letter! Please try again!", "type": "error", "time": 3});
        HandleGame("",playing.guess,playing.showList,guessArray,playing.guessLeft-1,setPlaying);
        }else{
        setNotification({"message": `Multiple Errors! In dictionary - ${response}, Correct length - ${testLength}, Correct start letter - ${testLetter}`, "type": "error", "time": 3});
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

export default connect(mapStateToProps)(Round3);