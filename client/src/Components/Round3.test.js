// similar to round two testing but with additional errors 
import Round3 from "./Round3";
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


const errorMessages = {
    blank:"Error! Cannot process blank guess!!",
    wrongLength:"This guess is in the dictionary but is too short! Please try again!",
    notWord:"This word is not in the dictionary! Please try again!",
    wrongLetter:"This word doesn't start with the original words last letter! Please try again!",
    multiple:"Multiple Errors! In dictionary - false, Correct length - false, Correct start letter - false"
}

function MockRound3(props){
    let gameOver = props.gameOver;
    let guess = props.guess;
    let playing = {guess:guess,letter:"",showList:1,guessList:["done","derail"],guessLeft:1};
    
    return <Provider store={store}><Round3 gameOver={gameOver} setGameOver={mockStates.setGameOver} playing={playing} setPlaying={mockStates.setPlaying} gameRound={3} setGameRound={mockStates.setGameRound}/></Provider>
};

describe('Round 3 Page Tests', () => {

    test('Page Matches Snapshot', () => {
        render(<MockRound3 gameOver={{status:false,result:false}}/>);
        expect(screen).toMatchSnapshot();
    });

    test('Page Renders Correctly', async () => {
        render(<MockRound3 gameOver={{status:false,result:false}} guess={""}/>);

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
        render(<MockRound3 gameOver={{status:false,result:false}} guess={"dangerous"}/>);
        let form = await screen.findByRole("form");
        let input = form.children[2];

        await waitFor(()=>{
        fireEvent.keyDown(input,
        {key:"Enter",keyCode:13});});
        expect(mockStates.setPlaying).toHaveBeenCalled();
        expect(mockStates.setGameOver).toHaveBeenCalled();
    });

    test('Game Lost', async () => {
                    render(<MockRound3 gameOver={{status:false,result:false}} guess={"dead"}/>);
                    let form = await screen.findByRole("form");
                    let input = form.children[2];
                    await waitFor(()=>{
                        fireEvent.keyDown(input,{key:"Enter",keyCode:13});
                        });
                
                    expect(mockStates.setPlaying).toHaveBeenCalledTimes(1);
                })

    
    test('Error Shows - Blank Guess', async () => {
        render(<MockRound3 gameOver={{status:false,result:false}} guess={""}/>);

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
        expect(mockStates.setGameRound).not.toHaveBeenCalled();
        expect(mockStates.setPlaying).not.toHaveBeenCalled();
    });

    
    test('Error Shows - Too Short', async () => {
        render(<MockRound3 gameOver={{status:false,result:false}} guess={"dry"}/>);

        let form = await screen.findByRole("form");
        let input = form.children[2];
        let word = await screen.findByText("abandoned");
        
        expect(form).toBeInTheDocument();
        expect(screen.queryByText(errorMessages.wrongLength)).toEqual(null);

        await waitFor(()=>{
            fireEvent.keyDown(input,{key:"Enter",keyCode:13});  
            expect(word).not.toBeInTheDocument(); 
            });
        
        expect(await screen.findByText(errorMessages.wrongLength)).toBeInTheDocument();
        expect(mockStates.setPlaying).toHaveBeenCalled();
        expect(mockStates.setGameOver).not.toHaveBeenCalled();
    });

    test('Error Shows - Not in dictionary', async () => {
        render(<MockRound3 gameOver={{status:false,result:false}} guess={"doningpl"}/>);

        let form = await screen.findByRole("form");
        let input = form.children[2];
        let word = await screen.findByText("abandoned");

        expect(form).toBeInTheDocument();
        expect(screen.queryByText(errorMessages.notWord)).toEqual(null);

        await waitFor(()=>{
            fireEvent.keyDown(input,{key:"Enter",keyCode:13}); 
            expect(word).not.toBeInTheDocument();  
            });
        
        expect(await screen.findByText(errorMessages.notWord)).toBeInTheDocument();
        expect(mockStates.setPlaying).toHaveBeenCalled();
        expect(mockStates.setGameOver).not.toHaveBeenCalled();// game not won
    });

    test('Error Shows - Wrong start letter', async () => {
        render(<MockRound3 gameOver={{status:false,result:false}} guess={"landing"}/>);

        let form = await screen.findByRole("form");
        let input = form.children[2];
        let word = await screen.findByText("abandoned");

        expect(form).toBeInTheDocument();
        expect(screen.queryByText(errorMessages.wrongLetter)).toEqual(null);

        await waitFor(()=>{
            fireEvent.keyDown(input,{key:"Enter",keyCode:13}); 
            expect(word).not.toBeInTheDocument();  
            });
        
        expect(await screen.findByText(errorMessages.wrongLetter)).toBeInTheDocument();
        expect(mockStates.setPlaying).toHaveBeenCalled();
        expect(mockStates.setGameOver).not.toHaveBeenCalled();// game not won
    }); 

    
    test('Error Shows - Multiple Errors', async () => {
        render(<MockRound3 gameOver={{status:false,result:false}} guess={"pqad"}/>);

        let form = await screen.findByRole("form");
        let input = form.children[2];
        let word = await screen.findByText("abandoned");

        expect(form).toBeInTheDocument();
        expect(screen.queryByText(errorMessages.multiple)).toEqual(null);

        await waitFor(()=>{
            fireEvent.keyDown(input,{key:"Enter",keyCode:13}); 
            expect(word).not.toBeInTheDocument();  
            });
        
        expect(await screen.findByText(errorMessages.multiple)).toBeInTheDocument();
        expect(mockStates.setPlaying).toHaveBeenCalled();
        expect(mockStates.setGameOver).not.toHaveBeenCalled();// game not won
    }); 
});