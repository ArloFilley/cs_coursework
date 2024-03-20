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
class LoginScreen {
    constructor() {
        this.textboxes = [
            new Textbox(
                120, 250, 500, 100, 0, true, user.colorScheme.text, false,
                "#000", "#000", true, false
            ),

            new Textbox(
                120, 400, 500, 100, 0, true, user.colorScheme.text, false,
                "000", "#000", false, false
            )
        ]

        this.buttons = [
            new Button(
                100, 200, 500, 100, 0, true, user.colorScheme.buttonBG, false,
                "#000", "#fff", ""
            ),

            new Button(
                100, 350, 500, 100, 0, true, "#000", false,
                "#000", "#fff", ""
            ),

            new Button(
                700, 300, 100, 50, 0, true, "#000", false,
                "#000", "#00ff00", "Login"
            ),
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
        fill(user.colorScheme.text);
        text("Username", 110, 175);
        text("Password", 110, 325);

        for (let i = 0; i < this.buttons.length; i++) {
            this.buttons[i].draw();
        }

        for (let i = 0; i < this.textboxes.length; i++) {
            this.textboxes[i].draw();
        }

        if (this.buttons[0].isPressed()) {
            this.textboxes[this.activeTextBox].line = false;
            this.activeTextBox=0;
            this.textboxes[this.activeTextBox].line = true;
        } else if (this.buttons[1].isPressed()) {
            this.textboxes[this.activeTextBox].line = false;
            this.activeTextBox=1;
            this.textboxes[this.activeTextBox].line = true;
        } else if (this.buttons[2].isPressed()) {
            api.login(this.textboxes[0].getWords(), this.textboxes[1].getWords())
            screenManager.setScreen(new StartScreen());
        }

        this.menu.draw();
    }

    /**
     * 
     * @param {key} key 
     */
    letterTyped(key) {
        if (key === "Tab" && this.activeTextBox === 0) {
            this.textboxes[this.activeTextBox].line = false;
            this.activeTextBox = 1;
            this.textboxes[this.activeTextBox].line = true;
        } else if (key === "Tab" && this.activeTextBox === 1) {
            this.textboxes[this.activeTextBox].line = false;
            this.activeTextBox = 0;
            this.textboxes[this.activeTextBox].line = true;
        } else if (key === "Enter") {
            api.login(
                this.textboxes[0].getWords(),
                this.textboxes[1].getWords()
            )
            screenManager.setScreen(new StartScreen());
        } else {
            this.textboxes[this.activeTextBox].letterTyped(key);
        }
    }
}