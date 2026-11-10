export const isValidGuess = (guess: string, base: number): boolean => {
  const validChars = '0123456789abcdef'.slice(0, base);
  return guess.length > 0 && [...guess].every((char) => validChars.includes(char.toLowerCase()));
};