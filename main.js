const MAIN_LOOP_SPEED = 500;
const PIXEL_SIZE = 8;
//TODO this is jank // just create the elements on load....
var mainCanvas = document.getElementById("canvas");
var mainContext = mainCanvas.getContext("2d");
var canvasWidth = document.querySelector("#canvas").width;
var canvasHeight = document.querySelector("#canvas").height;

//find a home
var timer = 0;

let testSprite = [
    'B', 'B', 'B', 'B',
    'B', 'Y', 'Y', 'B',
    'B', 'Y', 'Y', 'B',
    'B', 'B', 'B', 'B'
];

let testMap = [

];

class Screen {
    constructor(width, height, context) {
        this.width = width;
        this.height = height;
        this.context = context;
        this.sprites = [];
        this.pixelSize = PIXEL_SIZE;
    }
    draw() {
        this.sprites.forEach(s => {
            s.draw(this.context);
            //s.Move(1, 0);
        });
    }
    addSprite(x, y) {
        this.sprites.push(new Sprite(x, y));
    }
    clearScreen() {
        mainCanvas.width = mainCanvas.width;
    }
    getWidth() {
        return this.width;
    }
    getHeight() {
        return this.height;
    }
    getContext() {

    }
    drawTimer() {
        this.context.font = "bold 12px sans-serif";
        this.context.fillText(timer, 0, canvasWidth);
    }
}

function Init() {
    screen = new Screen(canvasWidth, canvasHeight, mainContext);
    // screen.AddSprite(0, 0);

    screen.sprites.push(new Level());
    screen.addSprite(0, 100);
    screen.sprites[1].load("testSprite");

}

function wait() {
    this.screen.clearScreen();
    this.screen.drawTimer();
    this.screen.draw();
    setTimeout('wait()', MAIN_LOOP_SPEED);
    timer++;
}


class Sprite {
    constructor(x, y, color = "black", z = 0) {
        this.size = 32;
        this.source = "";
        this.location = new Location(x, y);
        this.pixels = [];
    }
    load(spriteName = "") {
        if (spriteName != "testSprite") {
            for (var x = 0; x < this.size / 2; x++) {
                for (var y = 0; y < this.size / 2; y++) {
                    this.pixels.push(new Pixel(this.getLocation().x + screen.pixelSize * x, this.getLocation().y + screen.pixelSize * y, "blue"));
                }
            }
        } else {
            //overwrite default size with loaded sprite size.
            this.size = Math.sqrt(testSprite.length);
            let color = "white";

            let currentRow = 0;
            let currentColumn = 0;
            testSprite.forEach((p, i) => {

                if (p == 'B') {
                    color = "black";
                }
                if (p == 'Y') {
                    color = "yellow";
                }

                if (i % 4 == 0) {
                    currentRow++;
                    currentColumn = 0;
                }

                this.pixels.push(new Pixel(this.getLocation().x + screen.pixelSize * (currentColumn + 1 / screen.pixelSize),
                    this.getLocation().y + (screen.pixelSize * currentRow), color));

                currentColumn++;
            });
        }
        return this.pixels;
    }
    draw(context = {}) {
        this.pixels.forEach(p => {
            p.draw(context);
        });
    }
    getLocation() {
        return this.location;
    }
    move(offSetX, offSetY) {
        this.location.move(this.getLocation().x += offSetX, this.getLocation().y += offSetY);
        this.pixels.forEach(e => {
            e.location.move(offSetX, offSetY);
        });
    }
};
class Level {
    //level is a map of sprites.
    constructor() {
        this.map = [];
        this.load();
    }
    load(levelName = "") {
        for (var x = 0; x < Math.sqrt(screen.getWidth()); x++) {
            for (var y = 0; y < Math.sqrt(screen.getHeight()); y++) {
                let s = new Sprite(1 + screen.pixelSize * x, 1 + screen.pixelSize * y);
                s.load();
                this.map.push(s);
            }
        }
    }
    draw(context = {}) {
        this.map.forEach(p => {
            p.draw(context);
        });
    }
}
class Pixel {
    constructor(x, y, color, z) {
        this.location = new Location(x, y);
        this.color = color;
    }
    draw(context = {}) {
        context.fillStyle = this.color;
        context.fillRect(this.location.x, this.location.y, screen.pixelSize, screen.pixelSize);
    }
    move(offSetX, offSetY) {
        this.location.x += offSetX;
        this.location.y += offSetY;
    }

}
class Location {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.z = 0;
    }
    move(offSetX, offSetY) {
        this.x += offSetX;
        this.y += offSetY;
    }
}

//keybpard stuff
document.onkeydown = function(event) {
    var keyCode;

    if (event == null) {
        keyCode = window.event.keyCode;
    } else {
        keyCode = event.keyCode;
    }

    switch (keyCode) {
        // left
        case 37:
            // x = x - paddleSpeed;
            break;

            // up
        case 38:
            // y = y - paddleSpeed;
            break;

            // right
        case 39:
            // x = x + paddleSpeed;
            break;

            // down
        case 40:
            // y = y + paddleSpeed;
            break;

        default:
            break;
    }

}
Init();
wait();