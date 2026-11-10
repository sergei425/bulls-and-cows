const memoizedCount = new Map<string, number>();

export const countPossibleSecrets = (length: number, base: number): number => {
  const key = `${length}-${base}`;
  if (memoizedCount.has(key)) {
    return memoizedCount.get(key)!;
  }

  const result = length === 0 ? 1 : countPossibleSecrets(length - 1, base) * base;
  memoizedCount.set(key, result);
  return result;
};