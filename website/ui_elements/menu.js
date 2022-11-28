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
        this.buttons = [
            new Button(0,   0, 100, 30, 0, true, "#fff", false, "#000", "#000", "Account"),
            new Button(101, 0, 130, 30, 0, true, "#fff", false, "#000", "#000", "Test Data"),
            new Button(232, 0, 140, 30, 0, true, "#fff", false, "#000", "#000", "Start Test"),
            new Button(373, 0, 140, 30, 0, true, "#fff", false, "#000", "#000", "Leaderboard"),
            new Button(514, 0, 180, 30, 0, true, "#fff", false, "#000", "#000", "Test Settings")
        ]
    }

    draw() {
        textAlign(CENTER, CENTER);
        for (let i = 0; i < this.buttons.length; i++) {
            this.buttons[i].draw()
        }

        if (this.buttons[0].isPressed()) {
            screenManager.setScreen(new AccountScreen());
        } else if (this.buttons[1].isPressed()) {
            screenManager.setScreen(new ProfileScreen());
        } else if (this.buttons[2].isPressed()) {
            screenManager.setScreen(new TestScreen())
        } else if (this.buttons[3].isPressed()) {
            screenManager.setScreen(new LeaderboardScreen())
        } else if (this.buttons[4].isPressed()) {
            screenManager.setScreen(new settingsScreen())
        }
    }
}