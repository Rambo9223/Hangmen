
import Rounds_4_5 from "./Rounds_4_5";
import { render,screen, waitFor,fireEvent } from "@testing-library/react";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import { reducer } from "../Redux/reducer";
import "@testing-library/jest-dom";
import testWord from "./testword.json"

const initialState = [{item:testWord}]
const store = configureStore({reducer:reducer,preloadedState:initialState});

const mockStates = {
    setGameOver:jest.fn(),
    setPlaying:jest.fn(),
 }

const errorMessages = {
    blank:"Error! Cannot process blank guess!!",
    notSynonym:"isn't a synonym of ",
    notAntonym:"isn't a antonym of "
}

function MockRound4_5(props){
    let gameOver = props.gameOver;
    let guess = props.guess;
    let gameRound = props.gameRound
    let playing = {guess:guess,letter:"",showList:1,guessList:["escape","alone"],guessLeft:1};
    return <Provider store={store}><Rounds_4_5 gameOver={gameOver} setGameOver={mockStates.setGameOver} playing={playing} setPlaying={mockStates.setPlaying} gameRound={gameRound} setGameRound={null}/></Provider>
};

describe('Round 4&5 Page Tests', () => {

    test('Page Matches Snapshot', () => {
        render(<MockRound4_5 gameOver={{status:false,result:false}}/>);
        expect(screen).toMatchSnapshot();
    });

    test('Page Renders Correctly', async () => {
        render(<MockRound4_5 gameOver={{status:false,result:false}} guess={""} gameRound={4}/>);

        let lists = await screen.findAllByRole("list");
        let image = await screen.findByRole("img");
        let form = await screen.findByRole("form");
        let word = await screen.findByText("abandoned");
        expect(lists.length).toEqual(1);
        expect(image).toBeInTheDocument();
        expect(form).toBeInTheDocument();
        expect(word).toBeInTheDocument();
    });

    test('Game Won', async () => {
        render(<MockRound4_5 gameOver={{status:false,result:false}} guess={"rejected"} gameRound={4}/>);
        let form = await screen.findByRole("form");
        let input = form.children[2];
        await waitFor(()=>{
        fireEvent.keyDown(input,
        {key:"Enter",keyCode:13});});
        expect(mockStates.setPlaying).toHaveBeenCalled();
        expect(mockStates.setGameOver).toHaveBeenCalled();
    });

    test('Game Lost', async () => {
        render(<MockRound4_5 gameOver={{status:false,result:false}} guess={"accepted"} gameRound={4}/>);
        let form = await screen.findByRole("form");
        let input = form.children[2];
        await waitFor(()=>{
            fireEvent.keyDown(input,{key:"Enter",keyCode:13});
        });
                
        expect(mockStates.setPlaying).toHaveBeenCalledTimes(1);
    });
    
    test('Error Shows - Blank Guess', async () => {
        render(<MockRound4_5 gameOver={{status:false,result:false}} guess={""} gameRound={4}/>);

        let form = await screen.findByRole("form");
        let input = form.children[2];
        let word = await screen.findByText("abandoned");

        expect(form).toBeInTheDocument();
        expect(screen.queryByText(errorMessages.blank)).toEqual(null);
        expect(word).toBeInTheDocument();

        await waitFor(()=>{
            fireEvent.keyDown(input,{key:"Enter",keyCode:13});   
            });
        
        expect(word).not.toBeInTheDocument();
        expect(await screen.findByText(errorMessages.blank)).toBeInTheDocument();
        expect(mockStates.setGameOver).not.toHaveBeenCalled();
        expect(mockStates.setPlaying).not.toHaveBeenCalled();
    });

    
    test('Error Shows - Not Synonym', async () => {
        render(<MockRound4_5 gameOver={{status:false,result:false}} guess={"left"} gameRound={4}/>);

        let form = await screen.findByRole("form");
        let input = form.children[2];
        let word = await screen.findByText("abandoned");
        
        expect(form).toBeInTheDocument();
        expect(screen.queryByText(errorMessages.notSynonym)).toEqual(null);

        await waitFor(()=>{
            fireEvent.keyDown(input,{key:"Enter",keyCode:13});  
            expect(word).not.toBeInTheDocument(); 
            });
        
        expect(await screen.findByText(errorMessages.notSynonym,{exact:false})).toBeInTheDocument();
        expect(mockStates.setPlaying).toHaveBeenCalled();
        expect(mockStates.setGameOver).not.toHaveBeenCalled();
    });

    test('Error Shows - Not Antonym', async () => {
        render(<MockRound4_5 gameOver={{status:false,result:false}} guess={"found"} gameRound={5}/>);

        let form = await screen.findByRole("form");
        let input = form.children[2];
        let word = await screen.findByText("abandoned");

        expect(form).toBeInTheDocument();
        expect(screen.queryByText(errorMessages.notAntonym)).toEqual(null);

        await waitFor(()=>{
            fireEvent.keyDown(input,{key:"Enter",keyCode:13}); 
            expect(word).not.toBeInTheDocument();  
            });
        
        expect(await screen.findByText(errorMessages.notAntonym,{exact:false})).toBeInTheDocument();
        expect(mockStates.setPlaying).toHaveBeenCalled();
        expect(mockStates.setGameOver).not.toHaveBeenCalled();// game not won
    });

    
});