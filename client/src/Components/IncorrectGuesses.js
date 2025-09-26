// Display function to show incorrect guesses 
export default function IncorrectGuesses(props) {

    
       let guesses = props.guesses; // the current list of guesses
       // arrays for the list keys
        let keysI = [];
 
        const mapIncorrect = guesses.map((item) => {
         keysI.push(item);
         return (
         <div key={keysI} className="guess-border">
             <li className="incorrect-word" key={keysI}>
             {item}
             </li>
         </div>
         );
     });
     // return the list
     return (
         <>
         <div className="shadow" id="incorrect-words">
             <h4>Incorrect Guesses</h4>
             <ul className="word-ul">{mapIncorrect}</ul>
         </div>
         </>
     );
     
 
   
}