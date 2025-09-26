import {render,screen} from "@testing-library/react"
import GameLost from "./GameLost";


describe('GameLost Page Tests', () => {

    test('Page Matches Snapshot', () => {
        render(<GameLost lost={true}/>);
        expect(screen).toMatchSnapshot();
    });

    test('Game Modal Shows', async () => {
        render(<GameLost lost={true}/>);
        let title = await screen.findByText("You've Lost!",{exact:false});
        let image = await screen.findByRole("img");
        
        expect(title).toBeInTheDocument();
        expect(image).toBeInTheDocument();
    })

})