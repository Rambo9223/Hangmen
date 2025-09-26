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
    let body = <><img src={GameOver} alt="lost" width={"440px"} height={"220px"} />
    <br></br>
    {(gameRound===1)?<>
        You can start a new game? Or Restart this game?
    <div onClick={toggleLost}>
    <ToggleRestart setPlaying={setPlaying} setGameOver={setGameOver} /> 
    </div>
    </>:<></>}
    
    </>

    return (
      <>
        <div className="game-lost">
          <DisplayModalAuto body={body} title={"You've Lost! "} show={lost} handleClose={toggleLost} />
        </div>
      </>
    );
  }