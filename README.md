1. React-Hangman Game

2. Within the GIT repo is a basic hangman game made with create-react-app.

The App uses a filtered dictionary object to select an array of words, of which one is selected as the words used in the game.

Challeneges I had with creating this app included trying to plan what data was needed to be passed between components to make the program run smoothly.
In the future I'd like to implement a difficulty setting that user can select which would adjust the filter on the dictionary to include words of different lengths and possibly adjust the number of allowed guesses.

3. How to Install

Download the zipped file from GitHub and unzip in to your chosen directory.

Open the terminal or VSCode and navigate to the directory that contains the files using cd

![terminal](<src/Images/Screenshot%20(38).png>)

Type npm start , then enter, the required packages should install and once compiled you will be able to use the game on your browser at localhost:3000

![successful compile](<src/Images/Screenshot%20(36).png>)

4. How to Play

Begin by clicking New Game or to read the rules you can click the help link.

![opening screen](<src/Images/Screenshot%20(37).png>)

A hidden word will appear on screen, you can try to guess the word one letter at a time.
Type in your guesses to the guess input and click Guess.

![New Game](<src/Images/Screenshot%20(32).png>)

If your guess is correct a letter will appear on the screen & in correct letters.
If your guess is incorrect the Hangman will begin to appear and your letter will appear in incorrect letters.

![guesses](<src/Images/Screenshot%20(33).png>)

You can have a maximum of 10 incorrect guesses.

If you guess the word before the Hangman appears you win the game.

![Won!](<src/Images/Screenshot%20(34).png>)

If you fail to guess the word before the Hangman appears you lose the game.

![Lost](<src/Images/Screenshot%20(35).png>)

At any point in the game you can choose to start a new game, or restart the current game,

Selecting new game will give you a new word to guess where as restart will keep the word the same.
