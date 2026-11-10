import { generateSecret } from '../game/generateSecret';

describe('generateSecret', () => {
  it('should generate a secret number', () => {
    const secret = generateSecret(4, 10);
    expect(secret).toHaveLength(4);
    expect(secret).toMatch(/^[0-9]+$/);
  });
})
 