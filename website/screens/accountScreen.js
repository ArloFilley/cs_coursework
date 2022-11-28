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
class AccountScreen {
    constructor() {
        this.textboxes = [
            new Textbox(
                120, 350, 500, 100, 0, true, "#000", false,
                "#000", "#000", true
            ),

            new Textbox(
                120, 500, 500, 100, 0, true, "#000", false,
                "000", "#000", false
            )
        ]

        this.buttons = [
            new Button(
                100, 300, 500, 100, 0, true, "#000", false,
                "#000", "#fff", "", true, "#000", "#000", "#fff"  
            ),

            new Button(
                100, 450, 500, 100, 0, true, "#000", false,
                "#000", "#fff", "", true, "#000", "#000", "#fff"  
            ),

            new Button(
                900, 300, 100, 50, 0, true, "#000", false,
                "#000", "#00ff00", "Login"
            ),

            new Button(
                900, 400, 100, 50, 0, true, "#000", false,
                "#000", "#00ff00", "Sign up"
            ),

            new Button(
                900, 500, 100, 50, 0, true, "#000", false,
                "#000", "#00ff00", "Logout"
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
        background("#eeeee4");
        textSize(100);
        fill("#000");
        text("Account", 300, 100);
        for (let i = 0; i < this.buttons.length; i++) {
            this.buttons[i].draw();
        }

        for (let i = 0; i < this.textboxes.length; i++) {
            this.textboxes[i].draw();
        }

        textSize(30);
        text("Username", 110, 275);
        text("Password", 110, 425);

        if (this.buttons[0].isPressed()) {
            this.textboxes[this.activeTextBox].line = false;
            this.activeTextBox=0;
            this.textboxes[this.activeTextBox].line = true;
        } else if (this.buttons[1].isPressed()) {
            this.textboxes[this.activeTextBox].line = false;
            this.activeTextBox=1;
            this.textboxes[this.activeTextBox].line = true;
        } else if (this.buttons[2].isPressed()) {
            api.login(
                this.textboxes[0].getWords(),
                this.textboxes[1].getWords()
            )
            screenManager.setScreen(new StartScreen());
        } else if (this.buttons[3].isPressed()) {
            api.createUser(
                this.textboxes[0].getWords(),
                this.textboxes[1].getWords()
            )
            screenManager.setScreen(new StartScreen());
        } else if (this.buttons[4].isPressed()) {
            api.logout();
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
            this.activeTextBox=1;
            this.textboxes[this.activeTextBox].line = true;
        } else if (key === "Tab" && this.activeTextBox === 1) {
            this.textboxes[this.activeTextBox].line = false;
            this.activeTextBox=0;
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