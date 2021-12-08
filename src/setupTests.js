// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom
import '@testing-library/jest-dom';
import { server } from './mocks';

jest.setTimeout(10000);

beforeEach(() => {
  window.scrollTo = jest.fn();
});

// Establish API mocking before all tests.
beforeAll(() => server.listen());

// Reset any request handlers that we may add during the tests,
// so they don't affect other tests.
// Clean up after the tests are finished.
afterEach(() => {
  window.scrollTo.mockClear();
  server.resetHandlers();
});
afterAll(() => server.close());
