import {render,screen} from "@testing-library/react"
import GameWon from "./GameWon";

describe('GameLost Page Tests', () => {

    test('Page Matches Snapshot', () => {
        render(<GameWon won={true} gameRound={1}/>);
        expect(screen).toMatchSnapshot();
    });

    test('Game Modal Shows', async () => {
        render(<GameWon won={true} gameRound={1}/>);
        let title = await screen.findByText("Would you like to play round 2?");
        let image = await screen.findByRole("img");
        
        expect(title).toBeInTheDocument();
        expect(image).toBeInTheDocument();
    })

})