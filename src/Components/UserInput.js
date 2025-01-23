/* The user input component is used to handle the '
guess of the user, display two list of correct and incorrect guesses,
pass props to other components and reset the game. */

import { connect } from "react-redux";
import { useState } from "react";
import { Button } from "react-bootstrap";
import * as Icon from "react-bootstrap-icons";
// we import the below components to pass props to them
import WordDisplay from "./WordDisplay";
import HangmanImage from "./HangmanImage";
import Game from "./Game";

// mapStateToProps so we can access the word in the store state
function mapStateToProps(state) {
return {
    word: state,
};
}

// our initalState is set, we will use this to reset the game on restart or new game
const initalState = {
  guess: "", // the letter input to the text input
  letter: "", // the letter onclick of the guess button
  showList: Number(0), // the variable used to show the guesses lists
  guessList: [], // the array of all guesses
  guessLeft: Number(10), // the number of guesses left
};

function UserInput(props) {
  // pass the store state to props

  // the useState variable playing is initialised with the initialState object
const [playing, setPlaying] = useState(initalState);

if (props.word[0] !== undefined) {
    //if there is a word in the store state, i.e new game is clicked

    const word = props.word[0].word; // the word in the store
    let letterStatus = []; //the array to hold boolean values for each guess

    /* Question for marker!!
    I had alot of issues updating the guessList array within the object
    I found that i essentially had to create a secondary variable and make it equal to the 
    array within the object, I could push letters to the secondary variable, then id have to set
    the object array to this secondary variable. Is there a best practice to updating arrays within 
    a useState object? */

    // this function handles the letter the user inputs to the text input below
    function handleChange(event) {
    let input = event.target.value;
      // we update the object with guess = input & showList = 1
    handleNewSet(
        input,
        playing.letter,
        1,
        playing.guessList,
        playing.guessLeft
    );
    }

    // the handleNewSet function updates the useState object with new values
    // it also shortens the code needed to written in the below functions
    function handleNewSet(
    newGuess,
    newLetter,
    newShowList,
    newGuessList,
    newGuessLeft
    ) {
    setPlaying({
        guess: newGuess,
        letter: newLetter,
        showList: newShowList,
        guessList: newGuessList,
        guessLeft: newGuessLeft,
    });
    }

    //user Guess is called on click of the guess button
    function userGuess() {
      let send = word.includes(playing.guess); // boolean of (word.includes(guess))

      let guessArray = playing.guessList; // array of all guesses

      guessArray.push(playing.guess); // push new guess to array

      let letter = playing.guess; // secondary variable of guess
      // we use this so we can send props to other components onclick of guess button

    if (playing.guess !== "" && send === true) {
        //guess isnt blank and is in word
        // update guess, letter and guessArray
        handleNewSet(
        "",
        letter,
        playing.showList,
        guessArray,
        playing.guessLeft
        );
    } else if (playing.guess !== "" && send === false) {
        //guess isnt blank and isn't in word
        let num = playing.guessLeft - 1; // reduce number of guesses left by 1

        // update guess, letter, guessArray & guessLeft
        handleNewSet("", letter, playing.showList, guessArray, num);
    } else {
        //guess is blank, throw error
        alert("Error! Cannot process blank guess!");
    }
    }

    /* If user restarts the game we reset the playing object back to its inital state 
    deleting all stored values/guesses of the current game*/
    function Restart() {
    alert("Restarting game! Good Luck!");
    handleNewSet(
        initalState.guess,
        initalState.letter,
        initalState.showList,
        [],
        initalState.guessLeft
    );

    /*Question? for all other variables using initalState.variable 
        would reset the variables apart from the array, I had to pass a blank array
        otherwise the array with all the current games values would carry over
        why is this? */
    }

    // ToggleRestart is a button that onclick will restart the current game
    function ToggleRestart() {
    return (
        <Button
        className="restart-game-button"
        variant="primary"
        onClick={Restart}
        >
        Restart Game
        </Button>
    );
    }

    // the new game button from the DictionaryFilter component
    let newGame = document
    .getElementsByClassName("new-game-button")
    .item(Button);
    // we add an event listener onclick
    newGame.addEventListener("click", NewWord);

    // new word will reset the playing variable back to its initial state
    function NewWord() {
    handleNewSet(
        initalState.guess,
        "",
        initalState.showList,
        [],
        initalState.guessLeft
    );
    }

    // MapLists will take the guess and guess list and map out
    // a correct and incorrect guesses ul element
    function MapLists() {
      let guessArray = playing.guessList; // the current list of guesses
      // for each item we push a boolean value to the letterstatus array if item is/isn't in word
    guessArray.forEach((item) => {
        letterStatus.push(word.includes(item));
    });

      let correct = []; // list for correct guesses
      let incorrect = []; // list for incorrect guesses

      // push each guess in to respective correct/incorrect array
    guessArray.forEach((item) => {
        let finder = guessArray.indexOf(item);
        if (letterStatus[finder] === true) {
        correct.push(item);
        } else {
        incorrect.push(item);
        }
    });

      // arrays for the list keys
    let keysC = [];
    let keysI = [];

      /* using .map we map out the correct and incorrect arrays to ul elements */
    const mapCorrect = correct.map((item) => {
        keysC.push(item);
        return (
        <div className="guess-border">
            <li className="correct-letter" key={keysC}>
            {item}
            </li>
        </div>
        );
    });

    const mapIncorrect = incorrect.map((item) => {
        keysI.push(item);
        return (
        <div className="guess-border">
            <li className="incorrect-letter" key={keysI}>
            {item}
            </li>
        </div>
        );
    });

    return (
        <>
        <div className="guess-container" id="correct">
            <h4>Correct Guesses</h4>
            <ul className="correct-ul">{mapCorrect}</ul>
        </div>
        <div className="guess-container" id="incorrect">
            <h4>Incorrect Guesses</h4>
            <ul className="incorrect-ul">{mapIncorrect}</ul>
        </div>
        </>
    );
    }

    return (
    <>
        <Game
        word={word}
        guesses={playing.letter}
        game={playing.showList}
        remaining={playing.guessLeft}
        />
        <WordDisplay
        word={word}
        letter={playing.letter}
        game={playing.guessLeft}
        guessList={playing.guessList}
        />
        <HangmanImage num={playing.guessLeft} />
        <ToggleRestart />

        <div>You have {playing.guessLeft} guesses left!</div>
        <div className="add-guess">
        <form>
            <label className="guess-label" id="guess-label">
            Guess a letter:
            <br></br>
            <input
                id="user-input"
                type="text"
                onChange={(e) => handleChange(e)}
                value={playing.guess}
                name="guess"
                maxLength="1"
                className="user-guess"
            />
            </label>
            <Button id="guess-btn"
            variant="primary"
            className="guess-btn"
            type="button"
            onClick={() => userGuess()}
            >
            <Icon.QuestionCircleFill /> Guess
            </Button>
        </form>
        </div>
        {playing.showList === 1 ? <MapLists /> : null}
    </>
    );
}
}

export default connect(mapStateToProps)(UserInput);
