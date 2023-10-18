/**
 * @file   This file provides a screen for the user to login through
 * @author Arlo Filley
 * 
 * TODO:
 *      - move into an seperated account page with signup and logout
 *      - make passwords not display plain text
 */

/**
 * this class displays a number of textboxes that allows the user to input a
 * username and password. Then find out the user_id of that account through the 
 * necessary api routes.
 */
class OpenEveningScreen {
    constructor() {
        this.textboxes = [
            new Textbox(
                windowWidth / 2 - 380, 345, 500, 100,
                0, true, "#000", false,
                "#000", "#000", true
            ),

            // new Textbox(
            //     windowWidth / 2 - 380, 495, 500, 100,
            //     0, true, "#000", false,
            //     "#000", "#000", false, false, true
            // )
        ]

        this.buttons = [
            new Button(windowWidth / 2 - 400, 300, 500, 100, "", false, true, "#000", "#000", "#fff", "#000", "#000", "#fff"),
            // new Button(windowWidth / 2 - 400, 450, 500, 100, "", false, true, "#000", "#000", "#fff", "#000", "#000", "#fff"),
            new Button(windowWidth / 2 + 125, 312, 150, 75, "Create Account"),
            new Button(windowWidth / 2 + 300, 312, 150, 75, "Reset"),
        ]

        this.menu = new Menu();

        // keeps track of which textbox the user last clicked on
        this.activeTextBox = 0 
    }

    /**
     * Draws the SignUpScreen class with all 
     * appropriate elements
     */
    draw() {
        textSize(50);
        fill(user.colorScheme.text);
        text("Create an acount to start a typing test!", 0, 100, windowWidth, 110);
        for (let i = 0; i < this.buttons.length; i++) {
            this.buttons[i].draw();
        }

        for (let i = 0; i < this.textboxes.length; i++) {
            this.textboxes[i].draw();
        }

        fill(user.colorScheme.text);
        textSize(30);
        text("Username", windowWidth / 2 - 400, 275);
        // text("Password", windowWidth / 2 - 400, 425);

        if (this.buttons[0].isPressed()) {
            this.textboxes[this.activeTextBox].line = false;
            this.activeTextBox=0;
            this.textboxes[this.activeTextBox].line = true;
        } 
        // else if (this.buttons[1].isPressed()) {
        //     this.textboxes[this.activeTextBox].line = false;
        //     this.activeTextBox=1;
        //     this.textboxes[this.activeTextBox].line = true;
        // } 
        else if (this.buttons[1].isPressed()) {
            api.createUser(`Guest-${random(99_999).toFixed(0)}-${this.textboxes[0].getWords()}`, "Password")
            screenManager.setScreen(new TestScreen());
        } else if (this.buttons[2].isPressed()) {
            api.logout();
            screenManager.setScreen(new OpenEveningScreen());
        }

        this.menu.draw();

        fill(user.colorScheme.text);
    }

    /**
     * @param {KeyCode} key 
     * @returns {void}
     */
    letterTyped(key) {
        this.textboxes[this.activeTextBox].letterTyped(key);
    }
}