import { Button } from "react-bootstrap";
import HandleGame from "./HandleGame";
import initalState from "./initialState.json";

// when the current round is won the new round comopnent handles the change to the next round, unless it is the final round 
export default function NewRound(props){
    let gameRound = props.gameRound;
    let setGameRound = props.setGameRound;
    let setPlaying = props.setPlaying;
    let setGameOver = props.setGameOver;
    let stateSelect = `round${gameRound+1}`;
    let state = initalState[stateSelect];
    
    // when the button is clicked the next round begins 
    return (
    (gameRound<5)?<div >    
    <Button className="new-game-button" variant="primary" onClick={()=>{
        setGameOver({status:false,result:false});
        setGameRound(gameRound+1);
        HandleGame(state.guess, state.letter, state.showList, [], state.guessLeft, setPlaying)
        }}>
        Round {gameRound+1}
    </Button>
    </div>:null
    )
}