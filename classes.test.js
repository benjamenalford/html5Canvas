import Sprite from './classes';

//jest.mock('./classes');
let s = new Sprite();
beforeEach(() => {
    // sprite.mockClear();

});



test('spriteIsCreated', () => {
    expect(s.size).toBe(8);
    expect(s.source).toBe("");
    expect(s.location).toEqual([]);
    expect(s.pixels).toEqual([]);
});

test('spriteLoads', () => {
    let result = s.loadSprite();
    expect(result.length).toBeGreaterThan(1);
});

// it('should do what...', function(done) {
//     expect(1).toBe(1);
// });