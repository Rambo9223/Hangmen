import Round2 from "./Round2";
import { render,screen, waitFor,fireEvent } from "@testing-library/react";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import { reducer } from "../Redux/reducer";
import "@testing-library/jest-dom";

const initialState = [{item:{word:"abandoned"}},{item:{word:"secondary"}}]
const store = configureStore({reducer:reducer,preloadedState:initialState});

const mockStates = {
    setGameOver:jest.fn(),
    setPlaying:jest.fn(),
    setGameRound:jest.fn()
 }


function MockRound2(props){
    let gameOver = props.gameOver;
    let guess = props.guess;
    let playing = {guess:guess,letter:"",showList:1,guessList:["stoned","tones","derailed","executive"],guessLeft:1};
    return <Provider store={store}><Round2 gameOver={gameOver} setGameOver={mockStates.setGameOver} playing={playing} setPlaying={mockStates.setPlaying} gameRound={2} setGameRound={mockStates.setGameRound}/></Provider>
};

describe('Round 2 Page Tests', () => {

    test('Page Matches Snapshot', () => {
        render(<MockRound2 gameOver={{status:false,result:false}}/>);
        expect(screen).toMatchSnapshot();
    });

    test('Page Renders Correctly', async () => {
        render(<MockRound2 gameOver={{status:false,result:false}} guess={""}/>);

        let lists = await screen.findAllByRole("list");
        let image = await screen.findByRole("img");
        let form = await screen.findByRole("form");
        let word = await screen.findByText("abandoned");
        expect(lists.length).toEqual(1);
        expect(image).toBeInTheDocument();
        expect(form).toBeInTheDocument();
        expect(word).toBeInTheDocument();
    });

    test('Errors Show - Blank Guess', async () => {
        render(<MockRound2 gameOver={{status:false,result:false}} guess={""}/>);

        let form = await screen.findByRole("form");
        let input = form.children[2];
        let word = await screen.findByText("abandoned");

        expect(form).toBeInTheDocument();
        expect(screen.queryByText("Error! Cannot process blank guess!!")).toEqual(null);
        expect(word).toBeInTheDocument();

        await waitFor(()=>{
            fireEvent.keyDown(input,{key:"Enter",keyCode:13});   
            });
        
        expect(word).not.toBeInTheDocument();
        expect(await screen.findByText("Error! Cannot process blank guess!!")).toBeInTheDocument();
        expect(mockStates.setGameOver).not.toHaveBeenCalled();
        expect(mockStates.setGameRound).not.toHaveBeenCalled();
        expect(mockStates.setPlaying).not.toHaveBeenCalled();
    });

    test('Errors Show - Not in the word', async () => {
        render(<MockRound2 gameOver={{status:false,result:false}} guess={"stopped"}/>);

        let form = await screen.findByRole("form");
        let input = form.children[2];
        let word = await screen.findByText("abandoned");
        
        expect(form).toBeInTheDocument();
        expect(screen.queryByText("This guess is not in the word! Please try again!")).toEqual(null);

        await waitFor(()=>{
            fireEvent.keyDown(input,{key:"Enter",keyCode:13});  
            expect(word).not.toBeInTheDocument(); 
            });
        
        expect(await screen.findByText("This guess is not in the word! Please try again!")).toBeInTheDocument();
        expect(mockStates.setPlaying).toHaveBeenCalled();
        expect(mockStates.setGameOver).not.toHaveBeenCalled();// game not won
    });

    test('Errors Show - Not in dictionary', async () => {
        render(<MockRound2 gameOver={{status:false,result:false}} guess={"zoningpl"}/>);

        let form = await screen.findByRole("form");
        let input = form.children[2];
        let word = await screen.findByText("abandoned");

        expect(form).toBeInTheDocument();
        expect(screen.queryByText("This word is not in the dictionary! Please try again!")).toEqual(null);

        await waitFor(()=>{
            fireEvent.keyDown(input,{key:"Enter",keyCode:13}); 
            expect(word).not.toBeInTheDocument();  
            });
        
        expect(await screen.findByText("This word is not in the dictionary! Please try again!")).toBeInTheDocument();
        expect(mockStates.setPlaying).toHaveBeenCalled();
        expect(mockStates.setGameOver).not.toHaveBeenCalled();// game not won
    });

      test('Game Won', async () => {
        render(<MockRound2 gameOver={{status:false,result:false}} guess={"done"}/>);
        let form = await screen.findByRole("form");
        let input = form.children[2];
        await waitFor(()=>{
        fireEvent.keyDown(input,
        {key:"Enter",keyCode:13});});
        expect(mockStates.setPlaying).toHaveBeenCalled();
        expect(mockStates.setGameOver).toHaveBeenCalled();
    });

    test('Game Lost', async () => {
                render(<MockRound2 gameOver={{status:false,result:false}} guess={"found"}/>);
                let form = await screen.findByRole("form");
                let input = form.children[2];
                await waitFor(()=>{
                    fireEvent.keyDown(input,{key:"Enter",keyCode:13});
                    });
            
                expect(mockStates.setPlaying).toHaveBeenCalledTimes(1);
            })
});