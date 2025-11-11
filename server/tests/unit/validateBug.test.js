import { validateBugInput } from '../../src/utils/validateBug.js';

describe('validateBugInput', () => {
  it('rejects empty payload', () => {
    const { valid, errors } = validateBugInput(null);
    expect(valid).toBe(false);
    expect(errors.payload).toBeDefined();
  });

  it('requires title', () => {
    const { valid, errors } = validateBugInput({ description: 'x' });
    expect(valid).toBe(false);
    expect(errors.title).toBe('Title is required');
  });

  it('accepts valid input', () => {
    const { valid, errors } = validateBugInput({ title: 'Bug A', priority: 'low' });
    expect(valid).toBe(true);
    expect(errors).toEqual({});
  });

  it('rejects invalid priority', () => {
    const { valid, errors } = validateBugInput({ title: 'Bug B', priority: 'urgent' });
    expect(valid).toBe(false);
    expect(errors.priority).toBeDefined();
  });
});