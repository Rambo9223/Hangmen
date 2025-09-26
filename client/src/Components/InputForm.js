import { Button } from "react-bootstrap";
import { QuestionCircleFill } from "react-bootstrap-icons";
// input Component for user guesses
export default function InputForm(props){

    let gameOver = props.gameOver;
    let handleChange = props.handleChange;// change function passed from each Round
    let userGuess = props.userGuess;// current guess
    let guessLength = props.guessLength;
    let guess = props.guess; // inputted as playing.guess
    let gameRound = props.gameRound;// current round
    let heading = ["","letter","word","word","synonym","antonym"];

    // display input element if gameOVer is false 
    return(
    <div className="add-guess">
    {(gameOver.status===false)?
        <form aria-label="form">
            <label className="shadow" id="guess-label">
            Guess a {(gameRound!==undefined)?heading[gameRound]:<>letter</>}:
            </label>
            <br></br>
            <input
                id="user-input"
                type="text"
                onChange={(e) => handleChange(e)}
                onKeyDown={(e) => {
                    if (e.key === "Enter") {
                    e.preventDefault();
                    userGuess();
                }
            }}  
                
                value={guess}
                name="guess"
                maxLength={guessLength}
                className="user-guess"
            />
            
            <Button id="guess-btn"
            variant="primary"
            className="guess-btn"
            type="button"
            onClick={() => userGuess()}
            
            >
            <QuestionCircleFill /> Guess
            </Button>
        </form>
        :null}
        </div>
    )

}