// Simple check on function if returns true or false on correct answers
import CheckSynonymAntonym from "./CheckSynonymAntonym";
import * as testWord from "./testword.json"

describe('CheckSynonymAntonym Tests', () => {

    test('Checks Synonym on Round 4', async () => {
        let pass = await CheckSynonymAntonym(testWord,"deserted",4);
        expect(pass).toEqual(true);

        let fail = await CheckSynonymAntonym(testWord,"recovered",4);
        expect(fail).toEqual(false);
    });

    test('Checks Antonym on Round 5', async() => {
        let pass = await CheckSynonymAntonym(testWord,"recovered",5);
        expect(pass).toEqual(true);

        let fail = await CheckSynonymAntonym(testWord,"deserted",5);
        expect(fail).toEqual(false);
    });

})