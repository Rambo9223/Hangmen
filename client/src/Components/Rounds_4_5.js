import { connect } from "react-redux";
import { useState } from "react";
import HangmanImage from "./HangmanImage";
import HandleGame from "./HandleGame";
import InputForm from "./InputForm";
import Notification from "./Notification";
import Game from "./Game"; 
import IncorrectGuesses from "./IncorrectGuesses";
import CheckSynonymAntonym from "./CheckSynonymAntonym";

// mapStateToProps so we can access the word in the store state
function mapStateToProps(state) {
return {
    game: state,
};
}


function ROUNDS_4_5(props) {
  // pass the store state to props
    const [notification, setNotification] = useState({
            "message": "",
            "type": "",
            "time": 0,
        }); // notification state
    let item = props.game[0].item;
    let word = props.game[0].item.word; // the word in the store
    
    let gameOver = props.gameOver;
    let setGameOver = props.setGameOver;
    let playing = props.playing;
    let setPlaying = props.setPlaying;
    let gameRound = props.gameRound;
    let setGameRound = props.setGameRound;
    let mute = props.mute;


    // word showing now need to create the logic for round 3

    // for the handle change we only want this on click or enter
    // possibly change this to make the text lower case and reject if any special characters
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
      newGuess = newGuess.toLowerCase().replaceAll(" ", "");
      
      guessArray.push(newGuess);

      CheckSynonymAntonym(item,newGuess,gameRound).then((response)=>{
        if((response===true&&gameRound===4)){
            guessArray.pop();
            HandleGame("",playing.guess,playing.showList,guessArray,playing.guessLeft,setPlaying);
            setGameOver({status:true,result:true});
        }else if((response===true&&gameRound===5)){
            setGameOver({status:true,result:true});
            setGameRound(6);
        }
        else if(response===false&&gameRound===4){
            setNotification({"message": `${newGuess} isn't a synonym of ${word}! Please try again!`, "type": "error", "time": 2});
            HandleGame("",playing.guess,playing.showList,guessArray,playing.guessLeft-1,setPlaying);
        }else{
            setNotification({"message": `${newGuess} isn't a antonym of ${word}! Please try again!`, "type": "error", "time": 2});
            HandleGame("",playing.guess,playing.showList,guessArray,playing.guessLeft-1,setPlaying);
        }
      })
      // word not in dictionary && word has wrong start letter && word is too short
    }
    }

  return (
    <>
    {(notification.time>0)?<Notification message={notification.message} type={notification.type} time={notification.time} setNotification={setNotification}/>:<h1 className="shadow" id="game-word">{word}</h1>}
    {gameRound<6?
    <>
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
    </>:null}
    </>
    
  )
}

export default connect(mapStateToProps)(ROUNDS_4_5);