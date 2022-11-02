class LoginScreen { 
    constructor() {
        screenManager.textbox = new Textbox(100,400,400,200,0,true,"#000", false, "#000", "#000", false);
        screenManager.textbox2 = new Textbox(100,600,400,400,0,true,"#000", false, "#000", "#000", false);
        screenManager.loginButton = new Button(windowWidth-70,0,70,30,0,true,"#fff", false, "#000", "#000", "Login");
        this.pressedLast = 0;
        this.buttons = [
            new Button(80,350,400,100,0,true,"#000", false, "#fff", "#fff", ""), 
            new Button(80,550,400,100,0,true,"#000", false, "#fff", "#fff", "")
        ];
    }

    draw() {
        background("#eeeee4");
        textSize(100);
        textAlign(CENTER, CENTER);
        fill("#000")
        text("Login Screen", 0, 0, windowWidth - 600, windowHeight/5);
        textSize(20);
        text("Please Enter Your Username And Password", 0, 150, windowWidth-600, windowHeight-700)
        this.buttons[0].draw();
        this.buttons[1].draw();
        text("Username", 150, 325);
        text("Password", 150, 525);
        screenManager.textbox.draw();
        screenManager.textbox2.draw();
        screenManager.loginButton.draw();
        if (screenManager.loginButton.isPressed()) {
            api.login();
            screenManager.setScreen(new StartScreen());
        } else if (this.buttons[0].isPressed()) {
            this.pressedLast = 0;
        } else if (this.buttons[1].isPressed()) {
            this.pressedLast = 1;
        }
    }

    letterTyped(key) {
        if (this.pressedLast == 0) {
            screenManager.textbox.letterTyped(key);
        } else {
            screenManager.textbox2.letterTyped(key);
        }
    }
}