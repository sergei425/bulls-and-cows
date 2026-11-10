const memoizedCount = new Map();
export const countPossibleSecrets = (length, base) => {
    const key = `${length}-${base}`;
    if (memoizedCount.has(key)) {
        return memoizedCount.get(key);
    }
    const result = length === 0 ? 1 : countPossibleSecrets(length - 1, base) * base;
    memoizedCount.set(key, result);
    return result;
};
