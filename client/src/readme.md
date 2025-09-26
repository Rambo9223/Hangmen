New Concept - Hangmen

Multiple rounds, 
easy - no timer, ten guesses on round 1, 5 on all others
medium - 5 minute timer, guesses are the same, 
hard - 2 minute timer, dictionary fitltered to min 8 letters max 16, 
8 guesses round 1, 2 on all others 
extreme - 2 minute timer, dictionary same as hard 10 guesses across the 5 rounds

round 1 traditional hangman, Complete the puzzle with 10 possible guesses

round 2 Make any other word using the letters in the original 

round 3 make a word of the same,longer or no less than 2 characters shorter using the end letter as a starting point

round 4 make a synonym of the word - https://rapidapi.com/apininjas/api/thesaurus-by-api-ninjas

round 5 make an antonym of the word (same API);


Project Notes - Change title, 

Begin to write tests for frontend pages - Tests complete 

think design, how to implement music on different rounds create a sense of intensity,, 
how to keep simple, lets simplify create a general modal supply title and body rather than multiple 

we need to make sure the word meets all the requirements before the game starts if not remove it from dictionary. 
i.e need to know if there is a synonym and antonym and the other manipulations are possible

data manipulation needs to be done on original dictionary, keep whole dictionary as a checking reference for the answers, create a filtered version that ommits words less than 5 letters long 

change dictionary to downloaded, seems to have more words that have the required parametwers to play the full game

we have created a server that can act to query api and delete the manipulated dictionary as required, we need to connect these two projects so the array of numbers is send to the server, the backend should comb the array until a suitable word is found, delteting all the others that arent relevent in the process. 

Now we need to add the middleware and proxy that talks to the backend functions so we can initialise an array of usable words