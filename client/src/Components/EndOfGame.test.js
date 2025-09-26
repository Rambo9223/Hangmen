import { render,screen } from "@testing-library/react";
import "@testing-library/jest-dom"
import EndOfGame from "./EndOfGame";



describe('EndOfGame Page Tests', () => {

    test('Page Matches Snapshot', () => {
        render(<EndOfGame mute={true} gameOver={{status:true,result:true}} gameRound={6} />)
        expect(screen).toMatchSnapshot();
    });

    test('Page Renders Correctly', async () => {
        render(<EndOfGame mute={true} gameOver={{status:true,result:true}} gameRound={6} />)
        let images = await screen.findAllByRole("img");
        let links = await screen.findAllByRole("link");
        let heading = await screen.findByText("Congratulations! You've Won the Game!");
        let listItems = await screen.findAllByRole("listitem");
        expect(images.length).toEqual(4);
        expect(links.length).toEqual(3);
        expect(heading).toBeInTheDocument();
        expect(listItems.length).toEqual(3);
    })

})