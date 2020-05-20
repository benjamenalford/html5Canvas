import sprite from './classes';

//jest.mock('./classes');

beforeEach(() => {
    // sprite.mockClear();
});



test('spriteIsCreated', () => {
    let s = new sprite();
    expect(s.size).toBe(8);
    expect(s.source).toBe("");
    expect(s.location).toEqual([]);
    expect(s.pixels).toEqual([]);
});



// it('should do what...', function(done) {
//     expect(1).toBe(1);
// });