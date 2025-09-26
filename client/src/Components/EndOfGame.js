import { Winner,SoundCloud,GitHub,LinkedIn } from "../Assets/Images"
import Game from "./Game"

// End of game page
export default function EndOfGame(props){

    let gameOver = props.gameOver;
    let gameRound = props.gameRound;
    let mute = props.mute;

    return(<>
        
    <h4 className="shadow">Congratulations! You've Won the Game!</h4>
    <div id="game-won" >
        <img src={Winner} alt="GameWon"/>
    </div>
    <h4 className="shadow">Meet the creator on:</h4>
    <ul className="creator-links">
       <li><a href="https://github.com/Rambo9223">GitHub - <img src={GitHub} alt="GitHub Thumbnail"/></a></li>
       <li><a href="https://www.linkedin.com/in/scott-ramsay-287b43286/">LinkedIn - <img src={LinkedIn} alt="LinkedIn Thumbnail"/></a></li> 
       <li><a href="https://soundcloud.com/user-300219685">SoundCloud - <img src={SoundCloud} alt="SoundCloud Thumbnail"/></a></li>
    </ul>
    <Game gameOver={gameOver} gameRound={gameRound} mute={mute} guessLeft={1}/>

    </>)
}