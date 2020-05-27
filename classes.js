export default class Sprite {

    constructor() {
        console.info("created sprite");
        this.size = 8;
        this.source = "";
        this.location = [];
        this.pixels = [];
    }
    loadSprite(spriteName) {

        for (var x = 0; x < 10; x++) {
            for (var y = 0; y < 10; y++) {
                this.pixels.push(new Pixel(x, y, "black"));
            }
        }
        return this.pixels;
    }
    getSize() {
        return this.size;
    }

};
export class Pixel {
    constructor(x, y, color) {
        ///console.info("created pixel");
        this.x = x;
        this.y = y;
        this.color = color;
    }
}