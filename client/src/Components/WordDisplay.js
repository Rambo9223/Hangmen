import * as Icon from "react-bootstrap-icons";
import React from "react";

/* This function is used to display the state word,
we pass props to the function, the word, the letter the user guessed and the 
array of all guesses.

Initially the word will be hidden to the user, if the user guesses a correct letter
that letter will be displayed instead of the hidden character*/

function WordDisplay(props) {
  let word = props.word; // word
  let letter = props.letter; // user guess
  let guessList = props.guessList; // list of all guesses
  console.log(word);
  function MappedWord() {
    if (word) {
      let gameWord = String(word); // word converted to string

      let gameArray = gameWord.split(""); // then converted in to an array

      let keys = []; // the array we use to hold the keys for each mapped item

      const xArray = gameArray.map((item) => {
        // we map the Gamearray to the xArray

        keys.push(item); // push item to the keys array

        let hiddenItem = <Icon.QuestionSquare size={"36px"} />; // our icon displayed hiding letters

        if (item === letter) {
          // if item = current user guess

          item = letter; // display this guess
        }
        if (guessList.includes(item)) {
          // if item is in array of guesses
          let finder = guessList.indexOf(item); // find the index of the item
          item = guessList[finder]; // display the previous correct guess
        } else {
          item = hiddenItem;
        } // else display the hidden item

        // each letter is displayed as a li element
        return (
          <li className="hidden-letter" key={keys}>
            {item}
          </li>
        );
      });
      // the word is diplayed as a unorderd list
      return (
        <>
          <ul className="hidden-word">{xArray}</ul>
        </>
      );
    }
  }

  return (
    <>
      <MappedWord />
    </>
  );
}

export default WordDisplay;

//export default GuessHandler
