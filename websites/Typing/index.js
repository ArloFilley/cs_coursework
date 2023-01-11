/**
 * @file   This files is the root of the website.
 * @author Arlo Filley
 */

// these are all of the globally accessible variables that are
// needed for the site to run correctly
let canvas, api, screenManager, user;

/**
 * loads the any assets before the setup function
 * this allows p5.js to acess these assets including: sprites,
 * fonts, etc
*/
function preload() {
    roboto = loadFont('./assets/fonts/RobotoMono-Medium.ttf');
} 

/**
 * defines variables and sets up the p5.js canvas
 * ready to be drawn with using the draw() function
*/
function setup() {
    canvas = new Canvas();
    canvas.resize();
    canvas.center();

    frameRate(60);

    api = new API();
    screenManager = new ScreenManager();
    user = new User();
    screenManager.setScreen(new StartScreen());

    api.login();
    api.getTest();
    textFont(roboto);
}


/**
 * called once per frame. draws all other elements onto the canvas
 * mostly will just call the screenManager.draw() method to make
 * sure that the correct screen is being drawn
*/
function draw() {
    background(user.colorScheme.background);
    screenManager.draw();
}

/**
 * called whenever a key is pressed, the variable key contains the
 * key that the user last pressed
*/
function keyPressed() {
    screenManager.letterTyped(key);
}


/**
 * called whenever the user resizes the window. Uses methods from the canvas wrapper class
 * to resize and center the canvas such that it displays correctly
*/
function windowResized() {
    canvas.resize();
    canvas.center();
}