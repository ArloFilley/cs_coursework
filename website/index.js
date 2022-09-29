let canvas;
let textbox;

function setup() {
    // Creating the canvas
    canvas = new Canvas();
    canvas.resize();
    canvas.center();

    textbox = new Textbox(400, 200, 700);
}

function draw() {
    background(255,100,100);
    textbox.draw();
}


// whenever a key is pressed this function is called
function keyPressed() {
    textbox.letterTyped(key);
}


function windowResized() {
    canvas.resize();
    canvas.center();
}