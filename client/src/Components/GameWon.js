import { Winner } from "../Assets/Images";
import DisplayModalAuto from "./DisplayModalAuto";
import NewRound from "./NewRound";
import { TrophyFill } from "react-bootstrap-icons";

//Game won component that displays and asks user if they wish to play the next round
export default function GameWon(props) {
    let won = props.won;
    let toggleWon = props.toggleWon;
    let setPlaying = props.setPlaying;
    let gameRound = props.gameRound;
    let setGameRound = props.setGameRound;
    let setGameOver = props.setGameOver;
    
   // title & body are passed to the modal 
    let title = <>You've Won! <TrophyFill /></>;

    let body = <><img src={Winner} alt="winner" height={"220px"} width={"440px"} />
    <br></br>
    <>
    Would you like to play round {gameRound+1}?
    <br></br>
    <div onClick={toggleWon}>
    {/* New round component will change the gameRound by 1 */}
    <NewRound setPlaying={setPlaying} gameRound={gameRound} setGameRound={setGameRound} setGameOver={setGameOver}/>
    </div>
    </>
    </>
    // return the modal unless the final round is won
    return (
      <>
      {(gameRound<5)?
        <div className="game-won">
          <DisplayModalAuto body={body} title={title} show={won} handleClose={toggleWon} />
        </div>
        :null}
      </>
    );
  }