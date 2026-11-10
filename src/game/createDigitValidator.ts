export const createDigitValidator = (
  base: number,
): ((char: string) => boolean) => {
  const chars = '0123456789abcdef'.slice(0, base);
  return (char: string): boolean => {
    return chars.includes(char.toLowerCase()) && char.length === 1;
  } 
}