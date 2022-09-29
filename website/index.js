let canvas;
function setup() {
    // Creating the canvas
    canvas = new Canvas();
    canvas.resize();
    canvas.center();
}

function draw() {
    background(255,100,100);
}


function windowResized() {
    canvas.resize();
    canvas.center();
}