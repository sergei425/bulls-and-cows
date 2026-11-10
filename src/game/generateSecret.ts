import { Base, BASES } from '../types';

export const generateSecret = (length: number, base: Base, random = Math.random): string => {
  const digits = BASES[base].digits.split('');
  const shuffled = [...digits].sort(() => random() - 0.5);
  return shuffled.slice(0, length).join('');
}