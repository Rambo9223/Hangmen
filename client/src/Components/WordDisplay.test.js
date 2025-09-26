import { render, screen } from '@testing-library/react';
import WordDisplay from './WordDisplay';

let props = {"word":"absolute","letter":"a","guessList":["a","b","s","o","l","u","t","e"]}

describe('Word Display Page Tests',() => {
    
    // page matches snapshot
  test('Page matches snapshot', () => {
    render(<WordDisplay/>);
    expect(screen).toMatchSnapshot();
  });

  // with no guesses the word is hidden
  test('Word is hidden', async () => {
    render(<WordDisplay word={props.word} letter={""} guessList={[]}/>);

    for(let i=0;i<props.guessList.length;i++){
        
        let letter = (await screen.findByRole("list")).children.item(i).innerHTML;

        expect(letter).not.toEqual(props.guessList[i]);
    }

  });
  // the guessed letters are visible/some hidden
  test('Partial Word is visible', async () => {
    render(<WordDisplay word={props.word} letter={"e"} guessList={props.guessList}/>);

    for(let i=0;i<props.guessList.length;i++){
        // each list item
        let letter = (await screen.findByRole("list")).children.item(i).innerHTML;
        
        // letter is visible
        if(props.guessList.includes(String(letter))){
            expect(letter).toEqual(props.guessList[i]);
        }else{// is hidden
            expect(letter).not.toEqual(props.guessList[i]);
        }   
    }
  });

  // the full word is visible
  test('Full Word is visible', async () => {
    render(<WordDisplay word={props.word} letter={"e"} guessList={props.guessList}/>);

    for(let i=0;i<props.guessList.length;i++){
        
        let letter = (await screen.findByRole("list")).children.item(i).innerHTML;

        expect(letter).toEqual(props.guessList[i]);
        
    }
  });

})