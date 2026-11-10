export type Base = 'bin' | 'oct' | 'dec' | 'hex';
export type Settings = {
  length: number;
  base: Base;
};

export type GuessHistoryEntry = {
  guess: string;
  bulls: number;
  cows: number;
};

export type GameState = {
  settings: Settings;
  secret: string;
  history: GuessHistoryEntry[];
  startTime: number;
  gameStatus: 'setup' | 'playing' | 'won';
};

export const BASES: Record<Base, { maxLen: number; digits: string }> = {
  bin: { maxLen: 2, digits: '01' },
  oct: { maxLen: 8, digits: '01234567' },
  dec: { maxLen: 10, digits: '0123456789' },
  hex: { maxLen: 16, digits: '0123456789abcdef' }
};