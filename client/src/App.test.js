import { act, fireEvent, render, screen } from '@testing-library/react';
import App from './App';
import { Provider } from 'react-redux';
import store from "./Redux/store";

function MockApp() {
  return (
    <Provider store={store}>
      <App/>
    </Provider>
  );
}


describe('App Tests', () => {
    
  test('Page matches snapshot', () => {
    render(<MockApp />);
    expect(screen).toMatchSnapshot();
  });

  test('New Game Button begins new game', async () => {
    render(<MockApp/>);

    let newGame = await screen.findByText("New Game",{exact:false});
    expect(newGame).toBeInTheDocument();

    act(()=>{
      fireEvent.click(newGame);
    });
    // new game started
    let images = await screen.findAllByRole("img");//    console.log(image.outerHTML.includes("10"));
    let textInput = await screen.findAllByRole("textbox");//index 0
    let submitButton = (await screen.findAllByRole("button"));// index 3
    // elements are in document 
    expect(images.length).toEqual(2);
    expect(images[0]).toBeInTheDocument();
    expect(images[1]).toBeInTheDocument();
    expect(textInput[0]).toBeInTheDocument();
    expect(submitButton[3]).toBeInTheDocument();
  });

  test('Make correct or incorrect guess', async () => {
    render(<MockApp/>);

    let newGame = await screen.findByText("New Game",{exact:false});

    act(()=>{
      fireEvent.click(newGame);
    });
    // new game started
    let image = await screen.findByAltText("hangman 10");    
    
    let submitButton = await screen.findByText("Guess");// index 3
    //console.log(submitButton);
    let textInput = submitButton.parentElement.children[2];
    
    expect(await screen.findByText("You have 10 guesses left!")).toBeInTheDocument();
    expect(image.outerHTML.includes("10")).toEqual(true);
    
    act(()=>{
      fireEvent.change(textInput,{target:{value:"z"}});
      fireEvent.click(submitButton);
    })

    let answer = screen.queryByText("You have 10 guesses left!");
    
    if(answer===null){// incorrect answer, image will be changed

      let nextImage = (await screen.findByAltText("hangman 9")).outerHTML;
      expect(nextImage.includes("10")).toEqual(false);

    }else{// corrrect answer image hasn't changed
      let nextImage = (await screen.findByAltText("hangman 10")).outerHTML;
      expect(nextImage).toEqual(image.outerHTML);
    }
    
  })
})


