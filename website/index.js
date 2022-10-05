let canvas;
let api;
let textbox, timer;

function setup() {
    // Creating the canvas
    canvas = new Canvas();
    canvas.resize();
    canvas.center();

    frameRate(60);

    textbox = new Textbox(400, 200, 700);
    timer = new Timer(0, 0, 100, 100, 0, true, '#000', true, '#000','#F3C969', 10, true);
    timer.start();
    api = new API();
}

// this function is called once per frame and draws all other elements
function draw() {
    background(200);
    textbox.draw();
    timer.tick();
    timer.draw();
}


// whenever a key is pressed this function is called
function keyPressed() {
    textbox.letterTyped(key);
}

// This ensures that the canvas is always the correct size and at the center
// of the screen, p5 calls windowResized whenever the browser size is changed.
function windowResized() {
    canvas.resize();
    canvas.center();
}