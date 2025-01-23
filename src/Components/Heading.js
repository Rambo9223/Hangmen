import React, { useState } from "react";
import { Button } from "react-bootstrap";
import * as Icon from "react-bootstrap-icons";
import Modal from "react-bootstrap/Modal";

/* This is purly a display function for the heading , 
if bool is true the modal display help will pop up,
this contains the rules of the game */

function Heading() {
  const [bool, setBool] = useState(false);

  function Help() {
    return (
      <>
        <Button variant="primary" onClick={toggleHelp}>
          <Icon.InfoCircle /> Help
        </Button>
        <Modal show={bool} onHide={toggleHelp}>
          <Modal.Header closeButton>
            <Modal.Title>Game Rules</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            Can you guess the hidden word before the poor stick figure meets its
            doom? <br />
            Rules: <br />
            1 - guess one letter at a time.
            <br />
            2 - Type in your guesses to the guess input and click Guess.
            <br />
            3 - If your guess is correct a letter will appear on the screen & in
            correct letters. <br />
            4 - If your guess is incorrect the Hangman will begin to appear and
            your letter will appear in incorrect letters.
            <br />
            5 - You can have a maximum of 10 incorrect guesses. <br />
            6 - If you guess the word before the Hangman appears you win the
            game. <br />7 - If you fail to guess the word before the Hangman
            appears you lose the game.
          </Modal.Body>
          <Modal.Footer>
            <Button variant="primary" onClick={toggleHelp}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>
      </>
    );
  }

  function toggleHelp() {
    setBool(!bool);
  }

  return (
    <div className="heading">
      <h1>React-Hangman</h1>
      <h3>
        To start a new game click the button below.
        <br /> For help click here - <Help />{" "}
      </h3>
    </div>
  );
}

export default Heading;
