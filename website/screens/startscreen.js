class StartScreen {
    constructor() {
        this.buttons = [new Button(0,0,100,30,0,true,"#fff",false,"#000","#000","Sign Up")]
    }
    
    draw() {
        background("#eeeee4");
        textSize(100);
        textAlign(CENTER, CENTER);
        fill("#000");
        text("Press enter to start test", 0, 0, windowWidth - 100, windowHeight - 100);
        this.buttons[0].draw();
        if (this.buttons[0].isPressed()) {
            screenManager.setScreen(new SignUpScreen());
        }
    }

    letterTyped(key) {
        if (key === "Enter") {
            screenManager.setScreen(new TestScreen());
        }
    }
}