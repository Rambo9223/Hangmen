//import testword from "./testword.json"

// the function to verify the input is a synonym or antonym of the original word
async function CheckSynonymAntonym(object,guess,gameRound){

    let wordObject = object;
    let modified = [];
    let result;

    if(gameRound===4){
        // check for synonyms
        wordObject.synonyms.forEach((item)=>{modified.push(item.replaceAll(" ", "-"))});
        result = modified.includes(guess);
    }else{
        //check for antonyms
        wordObject.antonyms.forEach((item)=>{modified.push(item.replaceAll(" ", "-"))});
        result = modified.includes(guess);
    }

    return result // return boolean value


}

export default CheckSynonymAntonym; 