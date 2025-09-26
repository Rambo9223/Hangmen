export default function MapGuesses(props) {

     // MapGuesses will take the guess and guess list and map out
    // a correct and incorrect guesses ul element

        let guessArray = props.guessArray; // the current list of guesses
        let word = props.word; // the word to guess
        let letterStatus = []; // the status of each letter in the word

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
  
        /* using .map we map out the correct and incorrect arrays to ul elements */
      const mapCorrect = correct.map((item) => {
          let key = item + Math.floor(Math.random()*100);
          return (
          <div key={key} className="guess-border">
              <li className="correct-letter" >
              {item}
              </li>
          </div>
          );
      });
  
      const mapIncorrect = incorrect.map((item) => {
          let key = item + Math.floor(Math.random()*100);
          return (
          <div key={key} className="guess-border">
              <li className="incorrect-letter">
              {item}
              </li>
          </div>
          );
      });
      // return each list respecivley
      return (
          <>
          <div className="guess-container" id="correct">
              <h4 className="shadow">Correct Guesses</h4>
              <ul className="correct-ul">{mapCorrect}</ul>
          </div>
          <div className="guess-container" id="incorrect">
              <h4 className="shadow">Incorrect Guesses</h4>
              <ul className="incorrect-ul">{mapIncorrect}</ul>
          </div>
          </>
      );
      
  
    
}