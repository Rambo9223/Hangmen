// check that when guesses are 0 lost modal pops up, when game is won won modal pops up
import { render, screen } from '@testing-library/react';
import Game from './Game';
import "@testing-library/jest-dom"

const props = {
    gameOver:{status:false,result:false},setGameOver:jest.fn(),
    guessLeft:1,gameRound:1,setGameRound:jest.fn(),
    setPlaying:jest.fn()
}




describe('Game Page Tests', () => {

    test('Page matches snapshot', () => {
        render(<Game gameOver={props.gameOver}
        setGameOver={props.setGameOver} guessLeft={props.guessLeft} gameRound={props.gameRound} setGameRound={props.setGameRound} setPlaying={props.setPlaying}/>);
        expect(screen).toMatchSnapshot();
    });

    test('Game Won shows on game over equals true', async () => {

        render(<Game gameOver={{status:true,result:true}}
            setGameOver={props.setGameOver} guessLeft={props.guessLeft} gameRound={props.gameRound} setGameRound={props.setGameRound} setPlaying={props.setPlaying}/>);
        
        let won = await screen.findByText("Round 2");
        expect(won).toBeInTheDocument();
    });

    test('Game Lost shows on game over equals true & guesses left equals 0', async () => {

        render(<Game gameOver={{status:true,result:false}}
            setGameOver={props.setGameOver} guessLeft={0} gameRound={props.gameRound} setGameRound={props.setGameRound} setPlaying={props.setPlaying}/>);
        
        let lost = await screen.findByText("You've Lost!",{exact:false});
        expect(lost).toBeInTheDocument();
        expect(props.setGameOver).toHaveBeenCalledTimes(1);
    });
});