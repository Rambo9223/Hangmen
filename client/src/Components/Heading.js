import { PersonRaisedHand } from "react-bootstrap-icons";
import DisplayModal from "./DisplayModal";
import Help from "./Help";
import NewGame from "./NewGame";
import MuteButton from "./MuteButton";


/* This is purly a display function for the heading, Users can click the help button to get the game rules. 
*/

function Heading(props) {

  let gameRound = props.gameRound;
  let gameOver = props.gameOver;
  let setGameRound = props.setGameRound;
  let setPlaying = props.setPlaying;
  let setGameOver = props.setGameOver;
  let mute = props.mute;
  let setMute = props.setMute;

  function Icon(){
    return <>Help <PersonRaisedHand/></>;
  };
 
  return (<>
  <h1 className="shadow">Hangmen</h1>
    {(gameRound<6&&gameRound!==0)?<h4 className="shadow">Round {gameRound}</h4>:null}
    <div className="heading">
      <NewGame gameRound={gameRound} setPlaying={setPlaying} setGameRound={setGameRound} gameOver={gameOver} setGameOver={setGameOver}/>      
    {/* */}
      {(gameRound<6&&gameRound!==0)?
      <DisplayModal body={<Help gameRound={gameRound}/>} buttonText={<Icon/>} buttonVariant="secondary" title="Game Rules" />
      :null}
      <MuteButton mute={mute} setMute={setMute} gameRound={gameRound}/>{/* */}
    </div>
    </>

  );
}

export default Heading;
