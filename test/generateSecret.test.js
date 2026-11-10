import { generateSecret } from '../game/generateSecret';
describe('generateSecret', () => {
    it('generates secret with correct length and digits', () => {
        const secret = generateSecret(4, 10);
        expect(secret).toHaveLength(4);
        expect(/^[0-9]+$/.test(secret)).toBe(true);
    });
    test('should generate binary secret with only 0s and 1s', () => {
        const secret = generateSecret(3, 2);
        expect(secret).toHaveLength(3);
        expect(/^[01]+$/.test(secret)).toBe(true);
    });
    test('should generate hex secret with valid hex digits', () => {
        const secret = generateSecret(4, 16);
        expect(secret).toHaveLength(4);
        expect(/^[0-9A-Fa-f]+$/.test(secret)).toBe(true);
    });
});
