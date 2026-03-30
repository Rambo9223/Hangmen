import ToggleRestart from "./ToggleRestart";
import DisplayModalAuto from "./DisplayModalAuto";
import { GameOver } from "../Assets/Images";

// Function Triggered when the game is lost
export default function GameLost(props) {
    let lost = props.lost;//opens modal on true
    let toggleLost = props.toggleLost;// toggles modal 
    let setGameOver = props.setGameOver; // passes to ToggleRestart 
    let gameRound = props.gameRound; // if 1, game can be restarted
    let setPlaying = props.setPlaying; // passes to ToggleRestart

    // body component to pass to modal
    let body = <><img id="game-lost" src={GameOver} alt="lost" />
    <br></br>
    {(gameRound===1)?<>
        Restart this game? Or Quit & start a new game?
    <div onClick={toggleLost}>
    <ToggleRestart setPlaying={setPlaying} setGameOver={setGameOver} /> 
    </div>
    </>:<></>}
    
    </>

    return (
      <>
        <div>
          <DisplayModalAuto body={body} title={"You've Lost! "} show={lost} handleClose={toggleLost} />
        </div>
      </>
    );
  }