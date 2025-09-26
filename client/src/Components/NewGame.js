import { connect } from "react-redux"; //imported so we can use map state & map dispatch to props
import { newGame, removeOldGame } from "../Redux/reducer"; // the reducers we need
import { useState, useEffect } from "react";
import GetWordIndexes from "./GetWordIndexes";// function to get indexes
import { Button } from "react-bootstrap";
import initalState from "./initialState.json";
import HandleGame from "./HandleGame";
import Notification from "./Notification";
import { gameDictionary } from "../Assets/Dictionarys";


// we use redux state function to pass the word in our store to NewGame Props
function mapStateToProps(state) {
return {
    game: state,
};
}

// Our dispatch functions to add a new word to store and remove an old game
function mapDispatchToProps(dispatch) {
return {
    new: (item) => dispatch(newGame(item)),
    removeOld: (id) => dispatch(removeOldGame(id)),
};
}

function NewGame(props) {
    let gameRound = props.gameRound;
    let gameOver = props.gameOver;
    let setGameRound = props.setGameRound; 
    let setPlaying = props.setPlaying;
    let setGameOver = props.setGameOver;

    const [gameCount, setGameCount] = useState(0); // game count used to determine if game is first game

    const [notification, setNotification] = useState({
        "message": "",
        "type": "",
        "time": 0,
    }); // notification state

    // the useEffect will run prior to the user clicking the new game button
    useEffect(()=>{
        const fetchLength = () => {
            // when less than two games in the store
            if(props.game.length<2){
            let indexes = GetWordIndexes(gameDictionary.length);// get array of random indexes
            while(indexes.length>0){// while array has indexes
            let id = Math.floor(Math.random() * 200); // random id holder
            let item = gameDictionary[indexes[0]];//new word
            let gameCount = indexes[0] // count variable
            props.new({id,item,gameCount});// add this game to redux store
            indexes.shift();//remove this index from the array
            }
        }
        };        
        fetchLength();
        
    },);
        
    // user clicks new game button
    function NewWord(){

    if(gameOver.status===false&&gameRound>1){
        HandleGame(initalState.round1.guess, initalState.round1.letter, initalState.round1.showList, [], 0, setPlaying);
        setGameOver({status:true,result:false});
    }
    else{
    // on very first game
    if (props.game[0] !== null && gameCount ===0 && gameRound===0) {
    // alert message
    setNotification({"message": "Starting New Game!", "type": "success", "time": 1});
    setGameRound(1);// change game round
    setGameCount(1);// change count so this if statment is ignored
    } else if (props.game[1]!==undefined && gameCount === 1 && (gameRound === false || gameRound > 0)) {// remove old game for new game
        let oldId = props.game.id || props.game[0].id;
        props.removeOld(oldId);
        setNotification({"message": "Starting New Game!", "type": "success", "time": 1});
        setGameRound(1);
        setGameCount(1);
        

    } else if(props.game[1]===undefined){// error in initialising game
    setNotification({"message": "Error! Cannot set id, word or count!", "type": "success", "time": 1});
    setGameRound(0);
    setGameCount(0);
    }
    setGameOver({status:false,result:false});// used to reset game sounds if previous game is lost 
    HandleGame(initalState.round1.guess, initalState.round1.letter, initalState.round1.showList, [], initalState.round1.guessLeft, setPlaying);// resets game parameters to initial values
}
}
// function is returned as a button user clicks to start the game

return (<>

{(notification.time>0)?<Notification message={notification.message} type={notification.type} time={notification.time} setNotification={setNotification}/>:null}
{(gameOver.status===false && gameRound>1)?<div className="new-game">
<Button className="new-game-button" variant="warning" onClick={NewWord}>
    Give Up
</Button>
</div>:<div className="new-game">
<Button className="new-game-button" variant="success" onClick={NewWord}>
    New Game
</Button>
</div>}
</>
)

}

export default connect(mapStateToProps,mapDispatchToProps)(NewGame);