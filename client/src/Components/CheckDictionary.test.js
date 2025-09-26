// simple check dictionary return true for a word and false if not a word
import CheckDictionary from "./CheckDictionary";

describe('Check Dictionary Tests', () => {

    test('Returns true on word exists',async () => {
        let result = await CheckDictionary("defined");
        expect(result).toEqual(true);
    });

    test('Returns false on word does not exist',async () => {
        let result = await CheckDictionary("notdefined");
        expect(result).toEqual(false);
    });
})