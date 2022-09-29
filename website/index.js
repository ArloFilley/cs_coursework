let canvas;
let textbox, timer;

function setup() {
    // Creating the canvas
    canvas = new Canvas();
    canvas.resize();
    canvas.center();

    frameRate(60);

    textbox = new Textbox(400, 200, 700);
    timer = new Timer(100, 100, 0, 0, 0, 0, 0, 0, 0, 0, 15, false);
    timer.start();
}

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


function windowResized() {
    canvas.resize();
    canvas.center();
}