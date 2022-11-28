/**
 * @file   This file provides a screen class that can be displayed at the end of a test
 * @author Arlo Filley
 * 
 * TODO:
 *      - provide the user with the data of the test that they have just
 *        completed, such as their wpm, accuracy, etc.
 */

/**
 * This class is for a screen that is displayed at the end of a test,
 * currently it just tells the user to press start to enter another test
 */
class EndScreen {
    constructor() {
        this.menu = new Menu();
    }
    
    draw() {
        background("#eeeee4");
        textSize(100);
        textAlign(CENTER, CENTER);
        fill(0);
        text("Test Complete", 0, 0, windowWidth - 100, windowHeight / 6);

        textSize(30);
        text(`${user.lastTest.wpm} words per minute`, windowWidth / 2, 200);
        text(`${user.lastTest.accuracy}% accuracy`, windowWidth / 2, 240);
        text(`${user.lastTest.test_length} characters typed`, windowWidth / 2, 280);
        text(`${user.lastTest.test_time}s`, windowWidth / 2, 320);
        this.menu.draw();
    }

    letterTyped(key) {
        if (key === "Enter") screenManager.setScreen(new TestScreen());
    }
}