import { connect } from "react-redux"; //imported so we can use map state & map dispatch to props
import { newGame, removeOldGame } from "../Redux/reducer"; // the reducers we need
import React, { useState } from "react";
import { Button } from "react-bootstrap";
const json = require("../dictionary.json"); //our dictionary object
/*
This function is used to take the array of indexes and 
select one and pass this word to the store when initialing a new game.
we map state and dispatch to props.
*/

function mapStateToProps(state) {
return {
    word: state,
};
}

function mapDispatchToProps(dispatch) {
return {
    new: (word) => dispatch(newGame(word)),
    removeOld: (id) => dispatch(removeOldGame(id)),
};
}

function DictionaryFileredWord(props) {
  let index = props.index; //array of indexes passed from GetWordIndexes

  let toArray = Object.keys(json); //the words from the dictionary object

  // dictionary filtered to remove words less than 6 letters & more than 10 letters
let Arrayfiltered = toArray.filter(
    (word) => word.length > 5 && word.length < 11
);

  const id = Math.floor(Math.random() * 100); // random id holder

  let wordIndex = index[id]; //the index number at id

  const word = Arrayfiltered[wordIndex]; // word holder

  const [gameCount, setGameCount] = useState(0); // game count used to determine if game is first game

/* user clicks new game button to run the NewWord function,

    if id,word & gamecount aren't undefined we can push a new item to the 
    store state with props.new reducer, else throw error, set game count to 1
    
    if the game is not the first,ie game count is 1 and user starts a new game
    we push a new item to the store state and remove the old item with props.removeOld*/

function NewWord() {
    alert("Starting New Game!");
    if (id !== undefined && word !== undefined && gameCount !== undefined) {
    props.new({
        id,
        word,
        gameCount,
});
    } else {
alert("Error! Cannot set id, word or count!");
    }

    if (gameCount > 0) {
    let oldId = props.word[0].id;
    props.removeOld(oldId);
    }
    setGameCount(1);
}
  // the button to start a new game
function ToggleNewWord() {
    return (
    <Button className="new-game-button" variant="success" onClick={NewWord}>
        New Game
    </Button>
    );
}

return (
    <div className="new-game">
    <ToggleNewWord />
    </div>
);
}

export default connect(mapStateToProps,mapDispatchToProps)(DictionaryFileredWord);