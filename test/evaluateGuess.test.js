import { evaluateGuess } from '../game/evaluateGuess';
describe('evaluateGuess', () => {
    test('should return correct bulls and cows count', () => {
        expect(evaluateGuess('1234', '1245')).toEqual({ bulls: 2, cows: 1 });
    });
    test('should return all bulls when guess matches secret exactly', () => {
        expect(evaluateGuess('1234', '1234')).toEqual({ bulls: 4, cows: 0 });
    });
    test('should return all cows when digits match but positions differ', () => {
        expect(evaluateGuess('1234', '4321')).toEqual({ bulls: 0, cows: 4 });
    });
    test('should handle repeated digits correctly', () => {
        expect(evaluateGuess('1122', '1221')).toEqual({ bulls: 2, cows: 2 });
    });
});
