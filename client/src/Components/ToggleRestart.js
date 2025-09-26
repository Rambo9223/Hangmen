import { Button } from "react-bootstrap";
import HandleGame from "./HandleGame";
import initalState from "./initialState.json";

/* ToggleRestart is only available on a loss on round1
the game restarts with the current word in the store being unchanged */
export default function ToggleRestart(props) {
    
    let setPlaying = props.setPlaying;
    let setGameOver = props.setGameOver;

    return (
        <Button
        className="restart-game-button"
        variant="primary"
        onClick={()=>{
            setGameOver({status:false,result:false});
            HandleGame(initalState.round1.guess,initalState.round1.letter,
            initalState.round1.showList,[],initalState.round1.guessLeft,setPlaying);
        }}
        >
        Restart Game
        </Button>
    );
    }
