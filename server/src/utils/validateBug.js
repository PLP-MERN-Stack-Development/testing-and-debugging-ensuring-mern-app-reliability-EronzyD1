export function validateBugInput(payload) {
  const errors = {};
  if (!payload || typeof payload !== 'object') {
    errors.payload = 'Invalid payload';
    return { valid: false, errors };
  }
  if (!payload.title || payload.title.trim().length === 0) {
    errors.title = 'Title is required';
  }
  if (payload.priority && !['low', 'medium', 'high'].includes(payload.priority)) {
    errors.priority = 'Priority must be low, medium, or high';
  }
  return { valid: Object.keys(errors).length === 0, errors };
}