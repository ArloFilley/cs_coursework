/**
 * @file   This file provides a time menu class for editing the length of a test
 * @author Arlo Filley
 */

/**
 *  This class provides the timer, which handles when a test starts and ends as well
 *  as providing a visual element for the user to see
 */
class UserShower {
    constructor(x, y, height, width) {
        this.button = new Button(x, y, height, width, "");

        this.x = x;
        this.y = y;
        this.height = height;
        this.width = width;
    }

    draw() {
        textAlign(CENTER, CENTER);

        this.button.draw();

        if (user.secret !== undefined) {
            text(user.username, this.x + this.height / 2, this.y + this.width / 2)
        } else {
            imageMode(CENTER);
            if (this.button.isHovered()) {
                tint(0);
            } else {
                tint(255);
            }
            image(accountIcon, this.x + this.height / 2, this.y + this.width / 2);
        }
        

        if (this.button.isPressed()) {
            screenManager.setScreen(new OpenEveningScreen());
        }
    }
}