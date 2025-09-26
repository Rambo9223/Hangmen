// Display component that shows the game rules for each round
export default function Help(props) {

    let gameRound = props.gameRound;
    
    let help = [<>
        <h6>Can you guess the hidden word before the hangman takes his next victim?
        <br />
        </h6>
        
        <h6>Rules: </h6>
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
        game. <br />
        7 - If you fail to guess the word before the Hangman
        appears you lose the game.
    </>,
    <>
    <h6>
    You have defeated the Hangman in round 1! <br />
    </h6>
    <h6>Rules:</h6>
    1 - Using the word from the previous round, you must make a new word
    only using the letters from the previous word. <br />
    2 - You can use any number of letters from the previous word. <br />
    3 - You can use the letters in any order and multiple times. <br />
    4 - Type your word in the input and click Guess. <br />
    5 - If you input a correct word you win the round and progress to round 3. <br />
    6 - You can have a maximum of 5 incorrect words. <br />
    6 - If you fail to guess a word you lose the round and the Hangman


    </>,
    <>
    <h6>
    You have defeated the Hangman in round 2! <br />
    </h6>
    <h6>Rules:</h6>

    1 - Starting with the end letter of the previous word, you must make a new word. <br />
    2 - The new word must be no less than 2 characters less than the previous word. <br />
    3 - You can use any letters in any order to make the new word. <br />
    4 - Type your word in the input and click Guess. <br />
    5 - If you input a correct word you win the round and progress to round 3. <br />
    6 - You can have a maximum of 3 incorrect words. <br />
    7 - If you fail to guess a word you lose the round and the Hangman


    </>,
    <>
    <h6>
    You have defeated the Hangman in round 3! <br />
    </h6>
    <h6>Rules:</h6>
    1 - You must now make a synonym of the original word. <br />
    2 - You can use any letters in any order to make the new word. <br />
    3 - Type your word in the input and click Guess. <br />
    4 - If you input a correct word you win the round and progress to round 4. <br />
    5 - You can have a maximum of 3 incorrect words. <br />
    6 - If you fail to guess a word you lose the round and the Hangman
    </>,
    <>
    <h6>
    You have defeated the Hangman in round 4! <br />
    </h6>
    <h6>Rules:</h6>
    1 - You must now make an antonym of the original word. <br />
    2 - You can use any letters in any order to make the new word. <br />
    3 - Type your word in the input and click Guess. <br />
    4 - If you input a correct word you win the round and the game. <br />
    5 - You can have a maximum of 3 incorrect words. <br />
    6 - If you fail to guess a word you lose the round and the Hangman
    </>];

    // change this to suit the hangmen game varaiation you are creating add rounds 2/3/4/5
    return (
        <>
        <h4>Round {gameRound}</h4>
        <br />
        {help[gameRound-1]}   
        </>
    )
}