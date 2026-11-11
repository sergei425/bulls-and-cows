import { isValidGuess } from '../game/isValidGuess';

describe('isValidGuess', () => {
  test('should return true for valid decimal guess', () => {
    expect(isValidGuess('1234', 10)).toBe(true);
  });

  test('should return false for invalid decimal guess', () => {
    expect(isValidGuess('123g', 10)).toBe(false);
  });

  test('should return true for valid hex guess', () => {
    expect(isValidGuess('ABC1', 16)).toBe(true);
  });

  test('should return false for invalid hex guess', () => {
    expect(isValidGuess('XYZ1', 16)).toBe(false);
  });
});
