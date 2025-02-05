// import express
const express = require('express');
// import fs to update the Web-Project json file 
const fs = require('fs');
const fetch = require("node-fetch");
const asyncHandler = require('express-async-handler')
const app = express();
const port = process.env.PORT || 8080 // use port 8080 
const dictionary = require("./dictionaryModified.json"); // import our dictionary json file

// the base get function returns the current project list
app.get('/', (req, resp)=>{
    resp.send(`Your Project List - ${JSON.stringify(dictionary)}`);
})


// reduce function to remove words under 5 characters

app.put('/reducer/', (req, resp) => {
    /*let dictionaryKeys = Object.keys(dictionary);
    const reducedDictionary = dictionaryKeys.filter((word)=>word.length>5);
    console.log(reducedDictionary);
    //console.log(dictionaryKeys);
    fs.writeFileSync("./dictionaryModified.json", JSON.stringify(reducedDictionary));
    resp.send(`Dictionary reduced to words with more than 5 characters`);*/
}
);


// fetch function to get synonyms of a word
app.post('/synonyms/', asyncHandler(async(req, resp) => {
let limit = 100;
const url = `https://thesaurus-by-api-ninjas.p.rapidapi.com/v1/thesaurus?word=`;
const options = {
  method: 'GET',
  headers: {
    'x-rapidapi-key': '110a2e9954mshc99d3148f84bae6p127e6cjsn35e055779911',
    'x-rapidapi-host': 'thesaurus-by-api-ninjas.p.rapidapi.com'
  }
};

for(let i=0; i<limit; i++){
let word = dictionary[i];
if(dictionary[i].word === undefined){
    //console.log("no object");
    try {
        const response = await fetch((`${url}${word}`), options);
        const result = await response.json();
        if(result.synonyms.length === 0 || result.antonyms.length === 0){
            console.log("no synonyms or antonyms");
            resp.send(result)
            deleteItem(i);
            break;
        }else{
            console.log("here");
            console.log(result);
            addItem(i, result);
            //re-insert word to dictionary as object with synonyms and antonyms
        }
    
        //console.log(result.synonyms);
        resp.send(result);
        //resp.send(`Synonyms and Antonyms added to dictionary`);
    } catch (error) {
        console.error(error);
        //resp.send(error);
    }
    resp.end(); 
}else{
    console.log("object");  
    console.log(i);
}
    
}
/*

*/
}
));

// addItem will take user values & put them in an object
function addItem(index,item){
    
    dictionary[index] = item;
    // the json file is updated 
    fs.writeFileSync("./dictionaryModified.json", JSON.stringify(dictionary));
}

// deleteItem takes the index number of the item to delete 
// and removes from the array and updated the json file
function deleteItem(index){
    dictionary.splice(index, 1)
    fs.writeFileSync("./dictionaryModified.json", JSON.stringify(dictionary));
}


// a listen message to show user the server is running
app.listen(port, ()=>console.log(`Listening on Port-${port}`))
