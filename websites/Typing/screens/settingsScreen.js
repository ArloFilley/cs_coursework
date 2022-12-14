/**
 * @file   This file provides a screen where the user can edit the settings of their tests
 * @author Arlo Filley
 */

/**
 *  This class provides all of the necessary settings for the user to be able to edit test settings
 */
class settingsScreen {
    constructor() {
        this.menu = new Menu();
        this.timeMenu = new TimeMenu();
    }

    draw() {
        textAlign(CENTER, CENTER);

        textSize(100);
        fill(user.colorScheme.text);
        text("Test Settings", 450, 100);

        this.menu.draw();
        this.timeMenu.draw();
        fill("#000");
        text(`Logged in as ${user.username}`, windowWidth-150, 15);
    }
}