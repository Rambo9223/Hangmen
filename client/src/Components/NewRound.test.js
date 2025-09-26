import NewRound from "./NewRound";
import { render,screen,waitFor,fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";

const props = {gameRound:1,setGameRound:jest.fn(),setPlaying:jest.fn(),setGameOver:jest.fn()};

function MockNewRound(){
    return <NewRound gameRound={props.gameRound} setGameRound={props.setGameRound} setPlaying={props.setPlaying} setGameOver={props.setGameOver}/>
}

describe('New Round Page Tests', () => {

    test('Page matches snapshot', () => {
        render(<MockNewRound/>);
        expect(screen).toMatchSnapshot();
    });

    test('Page Renders Correctly', async () => {
        render(<MockNewRound/>);
        let newRoundButton = await screen.findByRole("button");
        expect(newRoundButton).toBeInTheDocument();
    });

    test('End Of Game', () => {
        // button should not be visible if gameRound is 5
        render(<NewRound gameRound={5}/>);
        let newRoundButton = screen.queryByRole("button");
        expect(newRoundButton).toEqual(null);
    });

    test('Functions call on click', async () => {
        render(<MockNewRound/>);
        let newRoundButton = await screen.findByRole("button");
        expect(newRoundButton).toBeInTheDocument();

        await waitFor(()=>{
            fireEvent.click(newRoundButton);
        });
        expect(props.setGameOver).toHaveBeenCalledTimes(1);
        expect(props.setGameRound).toHaveBeenCalledTimes(1);
        expect(props.setPlaying).toHaveBeenCalledTimes(1);
    })
})