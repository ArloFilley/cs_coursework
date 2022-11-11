class LoginScreen {
    constructor() {
        this.textboxes = [
            new Textbox(
                120,250,
                500,100,
                0,
                true,
                "#000",
                false, "#000",
                "#000"
            ),

            new Textbox(
                120,400,
                500,100,
                0,
                true,
                "#000",
                false,"000",
                "#000"
            )
        ]

        this.buttons = [
            new Button(
                100,200,
                500,100,
                0,
                true,
                "#000",
                false,"#000",
                "#fff",""
            ),

            new Button(
                100,350,
                500,100,
                0,
                true,
                "#000",
                false,"#000",
                "#fff",""
            ),

            new Button(
                700,300,
                100,50,
                0,
                true,
                "#000",
                false,"#000",
                "#00ff00","Login"
            ),
        ]

        this.activeTextBox = 0 
        // keeps track of which textbox the user last clicked on
    }

    /**
     * Draws the SignUpScreen class with all 
     * appropriate elements
     */
    draw() {
        background("#eeeee4");
        for (let i = 0; i < this.buttons.length; i++) {
            this.buttons[i].draw();
        }

        for (let i = 0; i < this.textboxes.length; i++) {
            this.textboxes[i].draw();
        }

        text("Username", 110, 175);
        text("Password", 110, 325);

        if (this.buttons[0].isPressed()) {
            this.activeTextBox=0;
        } else if (this.buttons[1].isPressed()) {
            this.activeTextBox=1;
        } else if (this.buttons[2].isPressed()) {
            api.login(
                this.textboxes[0].getWords(),
                this.textboxes[1].getWords()
            )
            screenManager.setScreen(new StartScreen());
        }
    }

    /**
     * 
     * @param {key} key 
     */
    letterTyped(key) {
        this.textboxes[this.activeTextBox].letterTyped(key);
    }
}