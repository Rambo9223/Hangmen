import Help from "./Help";
import {render, screen} from "@testing-library/react";


describe('Help Page Tests', () => {

    test('Page Matches Snapshot', () => {
        render(<Help gameRound={1}/>);
        expect(screen).toMatchSnapshot();
    });

    test('Page Renders Correctly', async () => {
        render(<Help gameRound={1}/>);
        let heading = await screen.findByText("Round 1");
        let rules = await screen.findByText("1 - guess one letter at a time.",{exact:false});
        expect(heading).toBeInTheDocument();
        expect(rules).toBeInTheDocument();

    })
})