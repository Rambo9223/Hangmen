import Round1 from "./Round1";
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


function MockRound1(props){
    let gameOver = props.gameOver;
    let guess = props.guess;
    let playing = {guess:guess,letter:"",showList:1,guessList:["a","b","n","d","o","z","m","l","p","s","q","w","r"],guessLeft:1};
    return <Provider store={store}><Round1 testing={true} gameOver={gameOver} setGameOver={mockStates.setGameOver} playing={playing} setPlaying={mockStates.setPlaying} gameRound={1} setGameRound={mockStates.setGameRound}/></Provider>
};

    describe('Round 1 Page Tests', () => {

        test('Page Matches Snapshot', () => { 
            render(<MockRound1 gameOver={{status:false,result:false}}/>);
            expect(screen).toMatchSnapshot();
        });

        test('Page Renders Correctly', async () =>{
            render(<MockRound1 gameOver={{status:false,result:false}} 
            guess={""}/>);
            let lists = await screen.findAllByRole("list");
            let image = await screen.findByRole("img");
            let form = await screen.findByRole("form");
            let restart = await screen.findByText("Restart Game",{exact:false});
            expect(lists.length).toEqual(3);
            expect(image).toBeInTheDocument();
            expect(form).toBeInTheDocument();
            expect(restart).toBeInTheDocument();
        });

        test('Errors Show - Blank guess',async() => {
            render(<MockRound1 gameOver={{status:false,result:false}}
            guess={""}/>);
            let form = await screen.findByRole("form");
            let lists = await screen.findAllByRole("list")
            let input = form.children[2];

            expect(lists[0]).toBeInTheDocument();
            expect(form).toBeInTheDocument();
            expect(screen.queryByText("Error! Cannot process blank guess!!")).toEqual(null);
        
            await waitFor(()=>{
            fireEvent.keyDown(input,{key:"Enter",keyCode:13});
            });

            expect(lists[0]).not.toBeInTheDocument();
            expect(await screen.findByText("Error! Cannot process blank guess!!")).toBeInTheDocument();
            expect(mockStates.setGameOver).not.toHaveBeenCalled();
            expect(mockStates.setGameRound).not.toHaveBeenCalled();
            expect(mockStates.setPlaying).not.toHaveBeenCalled();
            });
               
        test('Errors Show - Correct Duplicate', async () => {
            render(<MockRound1 gameOver={{status:false,result:false}}
            guess={"a"}/>);
            let form = await screen.findByRole("form");
            let lists = await screen.findAllByRole("list")
            let input = form.children[2];
            expect(lists[0]).toBeInTheDocument();
            expect(form).toBeInTheDocument();
            expect(screen.queryByText("Error! Cannot process duplicate guess!")).toEqual(null);

            await waitFor(()=>{
                fireEvent.keyDown(input,{key:"Enter",keyCode:13});
                });
        
            expect(lists[0]).not.toBeInTheDocument();
            expect(await screen.findByText("Error! Cannot process duplicate guess!",)).toBeInTheDocument();
            expect(mockStates.setPlaying).toHaveBeenCalledTimes(1);
        });

        test('Errors Show - Incorrect Duplicate', async () => {
            render(<MockRound1 gameOver={{status:false,result:false}} guess={"w"}/>);
            let form = await screen.findByRole("form");
            let input = form.children[2];
            await waitFor(()=>{
                fireEvent.keyDown(input,{key:"Enter",keyCode:13});
                });
        
            expect(await screen.findByText("Error! Cannot process duplicate guess!",)).toBeInTheDocument();
            expect(mockStates.setPlaying).toHaveBeenCalledTimes(1);
        });

        test('Game Won', async () => {
            render(<MockRound1 gameOver={{status:false,result:false}} guess={"e"}/>);
            let form = await screen.findByRole("form");
            let input = form.children[2];
            await waitFor(()=>{
                fireEvent.keyDown(input,{key:"Enter",keyCode:13});
                });
        
            expect(mockStates.setGameOver).toHaveBeenCalledTimes(1);
        });

        test('Game Lost', async () => {
            render(<MockRound1 gameOver={{status:false,result:false}} guess={"x"}/>);
            let form = await screen.findByRole("form");
            let input = form.children[2];
            await waitFor(()=>{
                fireEvent.keyDown(input,{key:"Enter",keyCode:13});
                });
        
            expect(mockStates.setPlaying).toHaveBeenCalledTimes(1);
        })
        
    });