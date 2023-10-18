/**
 * @file   This file provides a menu class to allow the user to easily navigate the site
 * @author Arlo Filley
 * 
 * TODO:
 *      - more sensible button names for easier navigation
 */

/**
 * this class provides a menu with all the relevent buttons the user will need,
 * it also handles when the user presses a button, by creating the correct screen
 */
class Menu {
    constructor() {
        this.numButtons = 5;
        this.user = new UserShower((windowWidth / this.numButtons) * 0, 0, windowWidth / this.numButtons, 50);
        this.buttons = [
            new Button((windowWidth / this.numButtons) * 1, 0, windowWidth / this.numButtons, 50, "Test Data"),
            new Button((windowWidth / this.numButtons) * 2, 0, windowWidth / this.numButtons, 50, "Start Test"),
            new Button((windowWidth / this.numButtons) * 3, 0, windowWidth / this.numButtons, 50, "Leaderboard"),
            new Button((windowWidth / this.numButtons) * 4, 0, windowWidth / this.numButtons, 50, "Test Settings")
        ]
    }

    draw() {
        textAlign(CENTER, CENTER);
        for (let i = 0; i < this.buttons.length; i++) {
            this.buttons[i].draw()
        }

        if (this.buttons[0].isPressed()) {
            screenManager.setScreen(new ProfileScreen());
        } else if (this.buttons[1].isPressed()) {
            screenManager.setScreen(new TestScreen())
        } else if (this.buttons[2].isPressed()) {
            screenManager.setScreen(new LeaderboardScreen())
        } else if (this.buttons[3].isPressed()) {
            screenManager.setScreen(new SettingsScreen())
        }

        this.user.draw()
    }
}