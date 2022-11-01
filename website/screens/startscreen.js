class StartScreen {
    constructor() {
        screenManager.textbox = new Textbox(100,100,400,400,0,true,"#000", false, "#000", "#000");
        screenManager.loginButton = new Button(0,0,70,30,0,true,"#fff", false, "#000", "#000", "Login");
    }
    
    draw() {
        background("#eeeee4");
        textSize(100);
        textAlign(CENTER, CENTER);
        fill("#000")
        text("Press enter to start test", 0, 0, windowWidth - 100, windowHeight - 100);
        screenManager.textbox.draw();
        screenManager.loginButton.draw();
        if (screenManager.loginButton.isPressed()) {
            this.loginScreen();
        }
    }

    loginScreen() {
        screenManager.setScreen(new LoginScreen());
    }
}