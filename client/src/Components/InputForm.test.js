import InputForm from "./InputForm";
import {render,screen,fireEvent,waitFor} from "@testing-library/react";
import "@testing-library/jest-dom"


const props = {
    gameOver:{status:false,result:false}, handleChange:jest.fn(),userGuess:jest.fn(),guessLength:1,guess:"z",gameRound:1
}

function MockForm(){
    return <InputForm gameOver={props.gameOver} handleChange={props.handleChange} userGuess={props.userGuess} guessLength={props.guessLength} guess={props.guess} gameRound={props.gameRound}/>
}


describe('Input Form Page Tests', () => {

    test('Page Matches Snapshot', () => {
        render(<MockForm/>);
        expect(screen).toMatchSnapshot();
    });

    test('Page Renders Correctly', async () => { 
        render(<MockForm/>);
        let heading = await screen.findByText("Guess a letter",{exact:false});
        let guessButton = await screen.findByRole("button");
        let form = await screen.findByRole("form")
        
        expect(heading).toBeInTheDocument();
        expect(guessButton).toBeInTheDocument();
        expect(form).toBeInTheDocument();
     });

     test('User Inputs letter, funtions called', async () => { 
        render(<MockForm/>);
        let guessButton = await screen.findByRole("button");
        let form = await screen.findByRole("form")
        let input = form.children[2];

        await waitFor(()=>{
            fireEvent.change(input,{target:{value:""}});// initial value so onChange function fires
            fireEvent.change(input,{target:{value:"z"}});

            // userGuess called on button click & Enter keypress
            fireEvent.click(guessButton);
            fireEvent.keyDown(input,{key:"Enter",keyCode:13});
        });
        expect(input.value).toBe("z");
        expect(props.handleChange).toHaveBeenCalledTimes(1);
        expect(props.userGuess).toHaveBeenCalledTimes(2);
     });

     test('Form Hidden on Game Over', () => {

        render(<InputForm gameOver={{status:true,result:false}} handleChange={props.handleChange} userGuess={props.userGuess} guessLength={props.guessLength} guess={props.guess} gameRound={props.gameRound}/>);

        let heading = screen.queryByText("Guess a letter",{exact:false});
        let guessButton = screen.queryByRole("button");
        let form = screen.queryByRole("form")
        
        expect(heading).toEqual(null);
        expect(guessButton).toEqual(null);
        expect(form).toEqual(null);

     })
})

