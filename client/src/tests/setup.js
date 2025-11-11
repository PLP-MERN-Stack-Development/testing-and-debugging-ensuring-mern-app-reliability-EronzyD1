// client/src/tests/setup.js
import '@testing-library/jest-dom';

// Vitest-style global shim for classroom tests that use `vi`
/* eslint-disable no-undef */
global.vi = global.vi || {
  fn: (...args) => jest.fn(...args),
  spyOn: (...args) => jest.spyOn(...args),
  useFakeTimers: (...args) => jest.useFakeTimers(...args),
  useRealTimers: (...args) => jest.useRealTimers(...args),
};
