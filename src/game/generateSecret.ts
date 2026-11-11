export const generateSecret = (length: number, base: number, random = Math.random): string => {
  const chars = '0123456789abcdef'.slice(0, base)
  const shuffled = Array.from({ length }, (_, i) => i % 2 ? chars[Math.floor(random() * chars.length)] : chars[Math.floor(random() * chars.length)]).sort(() => random() - 0.5);
  return shuffled.slice(0, length).join('');
}