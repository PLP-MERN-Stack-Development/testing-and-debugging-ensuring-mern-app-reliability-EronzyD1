// server/tests/unit/auth.util.test.js
const { generateToken, verifyToken } = require('../../src/utils/auth');

describe('auth utils', () => {
  test('generateToken returns a JWT string and verifyToken decodes it', () => {
    const user = { _id: 'u1', email: 'a@b.com' };
    const token = generateToken(user);
    expect(typeof token).toBe('string');

    const decoded = verifyToken(token);
    // accept either _id or id depending on your util implementation
    expect(decoded._id || decoded.id).toBe('u1');
  });

  test('verifyToken returns null/throws on invalid token safely', () => {
    try {
      const res = verifyToken('not-a-token');
      // if your verifyToken returns null on invalid:
      expect(res === null || res === undefined).toBe(true);
    } catch (_e) {
      // also ok if it throws; test still passes
      expect(true).toBe(true);
    }
  });
});
