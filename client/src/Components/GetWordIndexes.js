/*This function creates an array of 100 random numbers that we can pass to our dictionary filer */

function GetWordIndexes() {

  function getRandomNumber(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

let indexes = []
const min = 0;
const max = 370102;
const randomNumber = getRandomNumber(min, max);

console.log(`Random number between ${min} and ${max}: ${randomNumber}`);

for (let i = 0; indexes.length < 100; i++) {
    const randomNumber = getRandomNumber(min, max);
    if (!indexes.includes(randomNumber)) {
        indexes.push(randomNumber);
    }
}

  return indexes;

}

export default GetWordIndexes;
