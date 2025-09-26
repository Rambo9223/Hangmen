/*This function creates an array of random numbers that we can pass to our dictionary filer */

function GetWordIndexes(max) {//

  function getRandomNumber(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

let indexes = []
const min = 0;
;


for (let i = 0; indexes.length < 5; i++) {
    const randomNumber = getRandomNumber(min, max);
    if (!indexes.includes(randomNumber)) {
        indexes.push(randomNumber);
    }
}

  return indexes;

}

export default GetWordIndexes;
