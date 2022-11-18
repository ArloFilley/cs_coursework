class SignUpScreen {
    constructor() {
        this.textboxes = [
            new Textbox(
                120,250,
                500,100,
                0,
                true,
                "#000",
                false, "#000",
                "#000",
                true
            ),

            new Textbox(
                120,400,
                500,100,
                0,
                true,
                "#000",
                false,"000",
                "#000",
                false
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
                "#00ff00","Sign Up"
            ),
        ]

        this.menu = new Menu();

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

        fill("#000");
        text("Username", 110, 175);
        text("Password", 110, 325);

        if (this.buttons[0].isPressed()) {
            this.textboxes[this.activeTextBox].line = false;
            this.activeTextBox=0;
            this.textboxes[this.activeTextBox].line = true;
        } else if (this.buttons[1].isPressed()) {
            this.textboxes[this.activeTextBox].line = false;
            this.activeTextBox=1;
            this.textboxes[this.activeTextBox].line = true;
        } else if (this.buttons[2].isPressed()) {
            api.createUser(
                this.textboxes[0].getWords(),
                this.textboxes[1].getWords()
            )
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
            api.createUser(
                this.textboxes[0].getWords(),
                this.textboxes[1].getWords()
            )
            screenManager.setScreen(new StartScreen());
        } else {
            this.textboxes[this.activeTextBox].letterTyped(key);
        }
    }
}