// sum.test.js
const sum = require('./sum'); // Import the function to be tested

test('adds 1 + 2 to equal 3', () => {
  expect(sum(1, 2)).toBe(3); // Use Jest's 'expect' and 'toBe' matcher
});

test('adds 5 + 10 to equal 15', () => {
  expect(sum(5, 10)).toBe(15);
});