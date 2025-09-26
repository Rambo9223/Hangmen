import { fullDictionary } from "../Assets/Dictionarys";// dictionary onject

// A simple function to check the word inputted by the user is in the dictionary object 

export default async function CheckDictionary(word){
    let words = Object.keys(fullDictionary);
    let test = words.includes(word);
    return test;// returns boolean
}