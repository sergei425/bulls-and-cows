import { createDigitValidator } from "./createDigitValidator";
export const isValidGuess = (guess, base) => {
    const isDigit = createDigitValidator(base);
    return guess.length > 0 && [...guess].every(isDigit);
};
