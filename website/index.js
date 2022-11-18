let canvas, api, screenManager, user;

function preload() {
    roboto = loadFont('./assets/fonts/RobotoMono-Medium.ttf');
} 

function setup() {
    // Creating the canvas
    canvas = new Canvas();
    canvas.resize();
    canvas.center();

    frameRate(60);

    api = new API();
    screenManager = new ScreenManager();
    screenManager.setScreen(new StartScreen());
    user = new User();

    // will log the user in if there details are in local storage
    api.login();
    api.getTest();
    textFont(roboto);
}

// this function is called once per frame and draws all other elements
function draw() {
    screenManager.draw();
}


// whenever a key is pressed this function is called
function keyPressed() {
    screenManager.letterTyped(key);
}

// This ensures that the canvas is always the correct size and at the center
// of the screen, p5 calls windowResized whenever the browser size is changed.
function windowResized() {
    canvas.resize();
    canvas.center();
}