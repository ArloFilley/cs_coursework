class SignUpScreen {
    constructor() {
        textboxes = [
            new Textbox(
            0,0,
            0,0,
            true,
            "#000",
            false, "#000",
            "#000"
            ),

            new Textbox(
                0,0,
                0,0,
                true,
                "#000",
                false,"000",
                "#000"
            )
        ]
    }

    /**
     * Draws the SignUpScreen class with all 
     * appropriate elements
     */
    draw() {
        background("#eeeee4");
        for (texbox in this.textboxes) {
            textbox.draw();
        }
    }

    /**
     * 
     * @param {key} key 
     */
    letterTyped(key) {
        this.textboxes[0].letterTyped();
    }
}