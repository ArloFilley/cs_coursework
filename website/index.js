let canvas, api, screenManager;

function setup() {
    // Creating the canvas
    canvas = new Canvas();
    canvas.resize();
    canvas.center();

    frameRate(60);

    api = new API();
    screenManager = new ScreenManager();
}

// this function is called once per frame and draws all other elements
function draw() {
    background(200);
    screenManager.draw();
}


// whenever a key is pressed this function is called
function keyPressed() {
    screenManager.textbox.letterTyped(key);
}

// This ensures that the canvas is always the correct size and at the center
// of the screen, p5 calls windowResized whenever the browser size is changed.
function windowResized() {
    canvas.resize();
    canvas.center();
}