import IncorrectGuesses from "./IncorrectGuesses";
import {render,screen} from "@testing-library/react";

const guesses = ["t","e","s","t"]


describe('Incorrect Guesses Page Tests', () => {

    test('Page Matches Snapshot', () => {
        render(<IncorrectGuesses guesses={guesses}/>);
        expect(screen).toMatchSnapshot();
    });

    test('Page Renders Correctly', async () => {
        render(<IncorrectGuesses guesses={guesses}/>);
        let list = await screen.findAllByRole("listitem");
        expect(list.length).toEqual(4);
    })
})