/**
 * @file   This file provides a time menu class for editing the length of a test
 * @author Arlo Filley
 * 
 * TODO:
 *      - implement visual changes (borders, etc)
 *      - replace with methods with getters and setters
 *      - highlight which option the user has chosen in some way
 */

/**
 * this class displays a dropdown menu for the user where
 * they can edit the duration of a test
 */
class TimeMenu {
    constructor() {
        this.buttons = [
            new Button(900, 250, 100, 30, "15s"),
            new Button(900, 280, 100, 30, "30s"),
            new Button(900, 310, 100, 30, "45s"),
            new Button(900, 340, 100, 30, "60s"),
        ];

        this.topButton = this.buttons[0];
        this.dropDownButton = new Button(1000, 250, 30, 30, "v")
        this.dropdown = false;
    }

    draw() {
        if (this.dropdown) {
            for (let i = 0; i < this.buttons.length; i++) {
                this.buttons[i].draw() 
            }

            if (this.buttons[0].isPressed() && user.time != 15) {
                user.time = 15;
                this.topButton = new Button(900, 250, 100, 30, "15s");
                this.dropdown = false;
            } else if (this.buttons[1].isPressed()) {
                user.time = 30;
                this.topButton = new Button(900, 250,  100, 30, "30s");
                this.dropdown = false;
            } else if (this.buttons[2].isPressed()) {
                user.time = 45;
                this.topButton = new Button(900, 250,  100, 30, "45s");
                this.dropdown = false;
            } else if (this.buttons[3].isPressed()) {
                user.time = 60;
                this.topButton = new Button(900, 250,  100, 30, "60s");
                this.dropdown = false;
            }
        } else {
            this.topButton.draw();
        }

        this.dropDownButton.draw();
        if (this.dropDownButton.isPressed()) {
            this.dropdown = true;
        } else if (mouseIsPressed) { this.dropdown = false };
    }
}