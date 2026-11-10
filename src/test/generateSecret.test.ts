import { generateSecret } from '../game/generateSecret';

describe('generateSecret', () => {
  it('generates secret with correct length and digits', () => {
    const secret = generateSecret(3, 'hex');
    expect(secret).toHaveLength(3);
    expect(secret).toMatch(/^[0-9a-f]+$/);
  });
})
 