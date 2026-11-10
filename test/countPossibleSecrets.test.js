import { countPossibleSecrets } from '../game/countPossibleSecrets';
describe('countPossibleSecrets', () => {
    test('should return correct count for length 4 and base 10', () => {
        expect(countPossibleSecrets(4, 10)).toBe(10000);
    });
    test('should return correct count for length 3 and base 2', () => {
        expect(countPossibleSecrets(3, 2)).toBe(8);
    });
    test('should return correct count for length 2 and base 16', () => {
        expect(countPossibleSecrets(2, 16)).toBe(256);
    });
});
