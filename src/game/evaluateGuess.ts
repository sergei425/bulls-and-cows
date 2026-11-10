export const evaluateGuess = (guess: string, secret: string): { bulls: number; cows: number } => {
  let bulls = 0;
  let cows = 0;

  const secretDigitCount: Record<string, number> = {};
  const guessDigitCount: Record<string, number> = {};

  guess.split('').forEach((digit, index) => {
    if (digit.toUpperCase() === secret[index].toUpperCase()) {
      bulls++;
    } else {
      secretDigitCount[secret[index]] = (secretDigitCount[secret[index]] || 0) + 1;
      guessDigitCount[digit] = (guessDigitCount[digit] || 0) + 1;
    }
  });

  Object.keys(guessDigitCount).forEach((digit) => {
    if (secretDigitCount[digit]) {
      cows += Math.min(guessDigitCount[digit], secretDigitCount[digit]);
    }
  });

  return { bulls, cows }; 
};