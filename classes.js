export default class sprite {

    constructor() {
        console.info("created sprite")
        this.size = 8;
        this.source = "";
        this.location = [];
        this.pixels = [];
    }
    loadSprite(spiteName) {
        for (var x = 0; x < 10; x++) {
            console.log("blah")
        }
    }
    getSize() {
        return this.size;
    }

};
class pixel {
    constructor() {
        console.info("created pixel");
        this.x = 0;
        this.y = 0;
        this.color = 0;
    }
}