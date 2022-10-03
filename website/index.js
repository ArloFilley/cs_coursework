let canvas;
let textbox, timer;

function setup() {
    // Creating the canvas
    canvas = new Canvas();
    canvas.resize();
    canvas.center();

    frameRate(60);

    textbox = new Textbox(400, 200, 700);
    timer = new Timer(100,100,100,100,0,true,0,false,0,0,30,true);
    timer.start();
}

// this function is called once per frame and draws all other elements
function draw() {
    background(255,100,100);
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