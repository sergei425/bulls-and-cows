import { createDigitValidator } from "./createDigitValidator";

export const isValidGuess = (guess: string, base: number): boolean => {
  const isDigit = createDigitValidator(base);
  return guess.length > 0 && [...guess].every(isDigit);
};