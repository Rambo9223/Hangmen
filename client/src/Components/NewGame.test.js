import NewGame from "./NewGame";
import { Provider } from "react-redux";
import store from "../Redux/store";
import {render,screen,waitFor,fireEvent, cleanup} from "@testing-library/react";
import "@testing-library/jest-dom";

const props ={setGameRound:jest.fn(),setPlaying:jest.fn(),setGameOver:jest.fn(), 
    gameOver:{status:false,result:false}}

function MockNewGame(){
    return <Provider store={store}><NewGame setGameRound={props.setGameRound} setPlaying={props.setPlaying} setGameOver={props.setGameOver} gameRound={0} gameOver={props.gameOver}/></Provider>
}

describe('New Game Tests', () => {
    test('Page Matches Snapshot', () => {
        render(<MockNewGame/>);
        expect(screen).toMatchSnapshot();
    });

    // new test here for new game or give up button depending on the game round
    test('Page Renders Correctly', async () => {
        render(<MockNewGame/>);
        let newGameButton = await screen.findByText("New Game",{exact:false});
        expect(newGameButton).toBeInTheDocument();
        cleanup();

        render(<Provider store={store}><NewGame setGameRound={props.setGameRound} setPlaying={props.setPlaying} setGameOver={props.setGameOver} gameRound={2} gameOver={props.gameOver}/></Provider>)
        let giveUpButton = await screen.findByText("Give Up",{exact:false});
        expect(giveUpButton).toBeInTheDocument();
        expect(newGameButton).not.toBeInTheDocument();
    });
    

    test('Fuctions are called', async () => { 
        render(<MockNewGame />);
        let newGameButton = await screen.findByText("New Game",{exact:false});

        await waitFor(()=>{
            fireEvent.click(newGameButton);
        });
        let notification = await screen.findByText("Starting New Game!");
        expect(notification).toBeInTheDocument();
        expect(props.setGameOver).toHaveBeenCalledTimes(1);
        expect(props.setGameRound).toHaveBeenCalledTimes(1);
        
     })

})