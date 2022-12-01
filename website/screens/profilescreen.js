/**
 * @file   This file provides the user with their profilescreen, where they can see their own tests
 * @author Arlo Filley
 * 
 * TODO:
 *      - change button name
 *      - provide filters for tests
 *      - implement a way to scroll through tests
 *      - create a way to have personal bests and track them
 *      - store tests in localstorage.
 *      - show user tests even if they are not logged in
 */

/**
 * This class displays all of the test data for a given user
 */
class ProfileScreen {
    constructor() {
        this.menu = new Menu();
        api.getUserTests();
        this.testButtons;
        this.buttons = [
            new Button(950, 270, 240, 120, "up"),
            new Button(950, 390, 240, 120, "down"),
        ]
        this.offset = 0;
    }

    draw() {
        textSize(100);
        textAlign(CENTER, CENTER);
        fill(user.colorScheme.text);
        text("Profile", 0, 100, windowWidth, 120);

        this.menu.draw();

        textSize(20);
        fill(user.colorScheme.text);
        if (user.tests != undefined) {
            if (this.testButtons === undefined) {
                this.createTestButtons();
            }
        }

        if (this.testButtons !== undefined && this.testButtons.length > 1) {
            for (let i = 0; i < this.testButtons.length; i++) {
                this.testButtons[i][0].draw()
                this.testButtons[i][1].draw()
                this.testButtons[i][2].draw()
                this.testButtons[i][3].draw()
            }
            if (this.buttons[0].isPressed()) {
                if (this.offset > 0) {
                    this.offset--;
                }
                this.createTestButtons(this.offset);
            } else if (this.buttons[1].isPressed()) {
                if (user.tests.length - 13 - this.offset > 0) {
                    this.offset++;
                }
                this.createTestButtons(this.offset);
            }

            for (let i = 0; i < this.buttons.length; i++) {
                this.buttons[i].draw();
            }
        } else {
            fill(user.colorScheme.text);
            text("Looks Like You Don't have any tests :(", windowWidth / 2, 300);
        }
        
        fill(user.colorScheme.text);
        text(`Logged in as ${user.username}`, windowWidth-150, 15);
    }

    createTestButtons(offset = 0) {
        this.testButtons = [[
            new Button(400, 270, 100, 30, "test #"), // test # button
            new Button(500, 270, 100, 30, "wpm"), // wpm button
            new Button(600, 270, 100, 30, "accuracy"), // accuracy button
            new Button(700, 270, 240, 30, "characters typed")
        ]];
        let j = 300;
        for (let i = user.tests.length-1-offset; i >= user.tests.length-13-offset && i >= 0; i--) {
            this.testButtons.push([
                new Button(400, j, 100, 30, `${i+1}`, true, true , "#000", "#000", "#fff"), // test # button
                new Button(500, j, 100, 30, `${user.tests[i].accuracy}`, true, true , "#000", "#000", "#fff"), // accuracy button
                new Button(600, j, 100, 30, `${user.tests[i].wpm}`, true, true , "#000", "#000", "#fff"), // wpm button
                new Button(700, j, 240, 30, `${user.tests[i].test_length}`, true, true , "#000", "#000", "#fff")
            ])
            j+=30;
        }
    }
}