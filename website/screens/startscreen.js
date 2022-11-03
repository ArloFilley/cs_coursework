class StartScreen {
    constructor() {
        screenManager.textbox = new Textbox(100,100,400,400,0,false,"#000", false, "#000", "#000", false);
        screenManager.loginButton = new Button(0,0,70,30,0,true,"#fff", false, "#000", "#000", "Login", 20);
        screenManager.signupButton = new Button(75,0,85,30,0,true,"#fff", false, "#000", "#000", "signup", 20);
        screenManager.profileButton = new Button(165,0,100,30,0,true,"#fff", false, "#000", "#000", "profile", 20);
    }
    
    draw() {
        background("#eeeee4");
        textSize(100);
        textAlign(CENTER, CENTER);
        fill("#000")
        text("Press enter to start test", 0, 0, windowWidth - 100, windowHeight - 100);
        screenManager.textbox.draw();
        screenManager.loginButton.draw();
        screenManager.signupButton.draw();
        screenManager.profileButton.draw();
        if (screenManager.loginButton.isPressed()) {
            screenManager.setScreen(new LoginScreen());
        } else if (screenManager.signupButton.isPressed()) {
            screenManager.setScreen(new SignupScreen());
        } else if (screenManager.profileButton.isPressed()) {
            screenManager.setScreen(new ProfileScreen());
        }
    }

    letterTyped(key) {
        screenManager.textbox.letterTyped(key);
    }
}