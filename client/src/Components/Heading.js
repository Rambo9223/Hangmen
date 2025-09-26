import { InfoCircle } from "react-bootstrap-icons";
import DisplayModal from "./DisplayModal";
import Help from "./Help";
import NewGame from "./NewGame";
import { Hangman10 } from "../Assets/Images";


/* This is purly a display function for the heading, Users can click the help button to get the game rules. 
*/

function Heading(props) {

  let gameRound = props.gameRound;
  let gameOver = props.gameOver;
  let setGameRound = props.setGameRound;
  let setPlaying = props.setPlaying;
  let setGameOver = props.setGameOver;

  function Icon(){
    return <>Help <InfoCircle/></>;
  };
 
  return (
    <div className="heading">
      <h1 className="shadow">Hangmen</h1>
      <h4>
        <NewGame gameRound={gameRound} setPlaying={setPlaying} setGameRound={setGameRound} gameOver={gameOver} setGameOver={setGameOver}/>
      </h4>
      {(gameRound<6&gameRound!==0)?<div className="shadow">Round {gameRound} Rules - 
        <DisplayModal body={<Help gameRound={gameRound}/>} buttonText={<Icon/>} buttonVariant="primary" title="Game Rules" />
      </div>:<div>
        {gameRound===0?<img height={"300px"} width={"241px"} src={Hangman10} alt={`hangman`} />:null}
        </div>}
      
    </div>
  );
}

export default Heading;
