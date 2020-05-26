const MAIN_LOOP_SPEED = 30;
const PIXEL_SIZE = 8;
//TODO this is jank
var mainCanvas = document.getElementById("canvas");
var mainContext = mainCanvas.getContext("2d");

//TODO jank create on load
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
class Screen {
    constructor(width, height, context) {
        this.width = width;
        this.height = height;
        this.context = context;
        this.sprites = [];
        this.pixelSize = PIXEL_SIZE;
    }
    Draw() {
        this.sprites.forEach(s => {
            s.Draw(this.context);
            s.Move(1, 0);
        });
    }
    AddSprite(x, y) {
        this.sprites.push(new Sprite(x, y));
    }
    ClearScreen() {
        mainCanvas.width = mainCanvas.width;
    }
    GetWidth() {
        return this.width;
    }
    GetHeight() {
        return this.height;
    }
    drawTimer() {
        mainContext.font = "bold 12px sans-serif";
        mainContext.fillText(timer, 0, canvasWidth);
    }
}

function Init() {
    screen = new Screen(canvasWidth, canvasHeight, mainContext);
    // screen.AddSprite(0, 0);
    screen.AddSprite(0, 100);
    //screen.sprites[0].Load();
    screen.sprites[0].Load("testSprite");

}

function wait() {
    this.screen.ClearScreen();
    this.screen.drawTimer();
    this.screen.Draw();
    setTimeout('wait()', MAIN_LOOP_SPEED);
    timer++;
}


class Sprite {
    constructor(x, y) {
        this.size = 32;
        this.source = "";
        this.location = new Location(x, y);
        this.pixels = [];

    }
    Load(spriteName = "") {
        if (spriteName != "testSprite") {
            for (var x = 0; x < this.size / 2; x++) {
                for (var y = 0; y < this.size / 2; y++) {
                    this.pixels.push(new Pixel(this.GetLocation().x + screen.pixelSize * x, this.GetLocation().y + screen.pixelSize * y, "blue"));
                }
            }
        } else {
            console.log("loading sprite");
            this.size = Math.sqrt(testSprite.length);
            let color = "white";

            let currentRow = 0;
            let currentColumn = 0;
            testSprite.forEach((p, i) => {
                console.log(p);

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

                this.pixels.push(new Pixel(this.GetLocation().x + screen.pixelSize * (currentColumn + 1 / screen.pixelSize),
                    this.GetLocation().y + (screen.pixelSize * currentRow), color));

                currentColumn++;
            });
        }
        return this.pixels;
    }
    Draw(context = {}) {
        this.pixels.forEach(p => {
            p.Draw(context);
        });
    }
    GetLocation() {
        return this.location;
    }
    Move(offSetX, offSetY) {
        this.location.Move(this.GetLocation().x += offSetX, this.GetLocation().y += offSetY);
        this.pixels.forEach(e => {
            e.location.Move(offSetX, offSetY);
        });
    }

};
class Pixel {
    constructor(x, y, color) {
        this.location = new Location(x, y);
        this.color = color;
    }
    Draw(context = {}) {
        context.fillStyle = this.color;
        context.fillRect(this.location.x, this.location.y, screen.pixelSize, screen.pixelSize);
    }
    Move(offSetX, offSetY) {
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
    Move(offSetX, offSetY) {
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