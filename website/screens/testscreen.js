/**
 * @file   This file provides the functionality for the test
 * @author Arlo Filley
 * 
 * TODO:
 *      - provide a button that allows the user to exit the test
 *      - provide a count down to the start of a test
 *      - implement menus to allow the user to control the parameters of a test
 */

/**
 * this class displays the text of the test to the the screen and then takes input from the user
 * displaying red if it is inaccurate, and green if it is
 */
class TestScreen {
    constructor() {
        this.textbox = new Textbox(100,100,windowWidth - 200,windowHeight,0,true,"#000", false, "#000", "#000", true, true);
        this.timer = new Timer(0,0,windowWidth,50,0,true,"#fff", true, "#000", "#666", user.time, true);
        this.timer.start();
    }

    draw() {
        background("#eeeee4");
        this.textbox.draw();
        this.timer.draw();
        this.timer.tick();
    }

    letterTyped(key) {
        this.textbox.letterTyped(key);
    }
}