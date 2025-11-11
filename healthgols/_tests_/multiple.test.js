const multiple = require('./multiple');
test('multiple 2 * 2 to equal 3',()=>{
   expect(multiple(2,2)).toBe(4);
})
test("multiple 6 * 5",()=>{
    expect(multiple(6,5)).toBe(30);
})