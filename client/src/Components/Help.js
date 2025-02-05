export default function Help() {
    // change this to suit the hangmen game varaiation you are creating
    return (
        <>
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
        </>
    )
}