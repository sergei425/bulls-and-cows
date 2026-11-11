import {createDigitValidator} from '../game/createDigitValidator';

describe('createDigitValidator', () => {  
  describe("for base 8", () => {
    const isOctDigit = createDigitValidator(8);
    test("accepts 7", () => {
      expect(isOctDigit("7")).toBe(true);
    });
    test("rejects empty string", () => {
      expect(isOctDigit("")).toBe(false);
    });
    test("rejects 12", () => {
      expect(isOctDigit("12")).toBe(false);
    });
  });
  describe("for base 2", () => {
    const isBinaryDigit = createDigitValidator(2);
    test("accepts 1", () => {
      expect(isBinaryDigit("1")).toBe(true);
    });
    test("accepts 0", () => {
      expect(isBinaryDigit("0")).toBe(true);
    });
    test("rejects 2", () => {
      expect(isBinaryDigit("2")).toBe(false);
    });
  });
  describe("for base 10", () => {
    const isDecDigit = createDigitValidator(10);
    test("accepts 0", () => {
      expect(isDecDigit("0")).toBe(true);
    });
    test("accepts 9", () => {
      expect(isDecDigit("9")).toBe(true);
    });
    test("rejects 10", () => {
      expect(isDecDigit("10")).toBe(false);
    });
  });
  describe("for base 16", () => {
    const isHexDigit = createDigitValidator(16);
    test("accepts 0", () => {
      expect(isHexDigit("0")).toBe(true);
    });
    test("accepts a", () => {
      expect(isHexDigit("a")).toBe(true);
    });
    test("accepts A", () => {
      expect(isHexDigit("A")).toBe(true);
    });
    test("rejects 16", () => {
      expect(isHexDigit("16")).toBe(false);
    });
  });
});