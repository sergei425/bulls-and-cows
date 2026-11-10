export const createDigitValidator = (base) => {
    const chars = '0123456789abcdef'.slice(0, base);
    return (char) => {
        return chars.includes(char.toLowerCase()) && char.length === 1;
    };
};
