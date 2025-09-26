// The handle game function sets the game parameters for each round
export default function HandleGame(
    newGuess,
    newLetter,
    newShowList,
    newGuessList,
    newGuessLeft,
    setPlaying
    ) {
    setPlaying({
        guess: newGuess,
        letter: newLetter,
        showList: newShowList,
        guessList: newGuessList,
        guessLeft: newGuessLeft,
    });
    }