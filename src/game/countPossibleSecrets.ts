const memoizedCount = new Map<string, number>();

export const countPossibleSecrets = (length: number, base: number): number => {
  const key = `${length}-${base}`;
  if (memoizedCount.has(key)) {
    return memoizedCount.get(key)!;
  }

  const count = Math.pow(base, length);
  memoizedCount.set(key, count);
  return count;
};