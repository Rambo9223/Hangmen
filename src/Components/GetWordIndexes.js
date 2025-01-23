import { useEffect, useState } from "react";

/*This function uses useEffect & useState hooks to call from an api
an array of 100 random numbers that we can pass to our dictionary filer */

function GetWord() {
  const [index, setIndex] = useState(null); // will contain array of numbers

  const url =
    "https://seedy-random-number-generator.p.rapidapi.com/random/list?seed=anything&min=2&max=222772&size=100"; // our api

  useEffect(() => {
    const options = {
      method: "GET",
      headers: {
        "content-type": "application/octet-stream",
        "X-RapidAPI-Key": "110a2e9954mshc99d3148f84bae6p127e6cjsn35e055779911",
        "X-RapidAPI-Host": "seedy-random-number-generator.p.rapidapi.com",
      },
    };
    async function retrieveData() {
      // use an async function to call the api
      const retrieve = await fetch(url, options);
      const response = await retrieve.json();

      setIndex(response.result);
    }
    retrieveData(); //call the function
  }, []);

  // we have a preSet array defined so in the event of a failed call in the
  // api the game will still function
  let preSetArray = [
    117633, 164769, 98135, 95959, 199836, 217085, 107934, 101035, 107825,
    178977, 155170, 68326, 4061, 149878, 108383, 74620, 101585, 164700, 155386,
    217343, 171998, 103359, 50719, 24582, 103119, 140299, 86066, 25879, 142007,
    213839, 11632, 36823, 174549, 115952, 175895, 140150, 156385, 92192, 210088,
    64073, 15562, 209409, 213489, 180723, 87875, 150363, 51640, 49940, 53481,
    153051, 123006, 28966, 183557, 105678, 147090, 107700, 206938, 83902, 81802,
    169285, 140268, 149061, 58864, 198370, 204143, 123498, 72891, 187285, 72013,
    109747, 26661, 102706, 218601, 113401, 114520, 83010, 11818, 194038, 7304,
    146009, 20804, 114238, 51550, 155248, 64377, 85571, 214653, 93351, 65061,
    164202, 74820, 185362, 107211, 194609, 144690, 90283, 79807, 70776, 214116,
    219150,
  ];

  // if api retuns? return index, if not use preSetArray
  return index !== null ? index : preSetArray;
}

export default GetWord;
