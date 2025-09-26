import GetWordIndexes from "./GetWordIndexes";

describe('Get Word Indexes Tests', () => {

    test('Output matches expected', () => {

        let result = GetWordIndexes(5);
        expect(result.length).toBe(5);
        expect(result[0]).toBeGreaterThanOrEqual(0);
    });
})