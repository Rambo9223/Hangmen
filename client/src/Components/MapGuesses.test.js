import MapGuesses from "./MapGuesses";
import {render,screen} from "@testing-library/react";

const props = {
    word:"testing",guessArray:["t","a","g","c","s","b","h"]
};

function MockPage(){
    return <MapGuesses word={props.word} guessArray={props.guessArray}/>
}

describe('Map Guesses Page Tests', () => {

    test('Page Matches Snapshot', () => {
        render(<MockPage/>);
        expect(screen).toMatchSnapshot();
    })

    test('Page Renders Correctly', async () => {
        render(<MockPage/>);
        let lists = await screen.findAllByRole("list");


        expect(lists.length).toEqual(2);// two lists 
        //two headings 
        expect(screen.getByText("Correct Guesses")).toBeInTheDocument();
        expect(screen.getByText("Incorrect Guesses")).toBeInTheDocument();


        expect(lists[0].children.length).toEqual(3);// 3 correct guesses
        expect(lists[1].children.length).toEqual(4);// 4 incorrect guesses
        
    })
})