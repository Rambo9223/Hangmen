import {render, screen} from "@testing-library/react";
import { Provider } from "react-redux";
import store from "../Redux/store";
import Heading from "./Heading";


function MockHeading(){
    return (
        <Provider store={store}>
            <Heading gameRound={1} gameOver={{status:false,result:false}}/>
        </Provider>
    )
}

describe('Heading Page Tests', () => {

    test('Page Matches Snapshot', () => {
        render(<MockHeading/>);
        expect(screen).toMatchSnapshot();
    });
    
    test('Page renders all elements', async () => {
        render(<MockHeading/>);
        let title = await screen.findByText("Hangmen");
        let newGame = await screen.findByText("New Game");
        let rules = await screen.findByText("Help");

        expect(title).toBeInTheDocument();
        expect(newGame).toBeInTheDocument();
        expect(rules).toBeInTheDocument();
    });
})