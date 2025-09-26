import { render,screen } from "@testing-library/react";
import HangmanImage from "./HangmanImage";


describe('Hangman Image Page Tests', () => {

    test('Page Matches Snapshot', () => {
        render(<HangmanImage num={10}/>);
        expect(screen).toMatchSnapshot();
    });

    test("Image Shows", async() =>{
        render(<HangmanImage num={10}/>);
        let image = await screen.findByRole("img");
        expect(image).toBeInTheDocument();
        expect(image.outerHTML.includes("hangman 10")).toEqual(true);
    })
})