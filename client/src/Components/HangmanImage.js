// we import our images for the hangman and add them to an array
import { Hangman1,Hangman2,Hangman3,Hangman4,Hangman5,Hangman6,Hangman7,Hangman8,Hangman9,Hangman10,Hangman11 } from "../Assets/Images";
let imageArray = [Hangman11,Hangman10,Hangman9,Hangman8,Hangman7,Hangman6,Hangman5,Hangman4,Hangman3,Hangman2,Hangman1
];

/* The HangmanDisplay function recieves the guesses left number as props
and returns an image and the respective index.
if the guesses left number changes ie(wrong guess) the imgage displayed will also change  */

function HangmanImage(props) {
  let num = props.num;
  
  return (
    <div className="image-container">
      <img height={"300px"} width={"241px"} src={imageArray[num]} alt={`hangman ${num}`} />
    </div>
  );
}

export default HangmanImage;