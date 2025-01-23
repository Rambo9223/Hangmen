// we import our images for the hangman and add them to an array
import hangman0 from "../Images/state11.GIF";
import hangman1 from "../Images/state10.gif";
import hangman2 from "../Images/state9.GIF";
import hangman3 from "../Images/state8.GIF";
import hangman4 from "../Images/state7.GIF";
import hangman5 from "../Images/state6.GIF";
import hangman6 from "../Images/state5.GIF";
import hangman7 from "../Images/state4.GIF";
import hangman8 from "../Images/state3.GIF";
import hangman9 from "../Images/state2.GIF";
import hangman10 from "../Images/state1.GIF";
let imageArray = [
hangman0,
hangman1,
hangman2,
hangman3,
hangman4,
hangman5,
hangman6,
hangman7,
hangman8,
hangman9,
hangman10,
];

/* The HangmanDisplay function recieves the guesses left number as props
and returns an image and the respective index.
if the guesses left number changes ie(wrong guess) the imgage displayed will also change  */

function HangmanImage(props) {
  let num = props.num;
  return (
    <div className="image-container">
      <img src={imageArray[num]} alt="hangman" />
    </div>
  );
}

export default HangmanImage;