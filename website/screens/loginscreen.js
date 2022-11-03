class LoginScreen { 
    constructor() {
        screenManager.textbox = new Textbox(100,400,400,200,0,true,"#000", false, "#000", "#000", false);
        screenManager.textbox2 = new Textbox(100,600,400,400,0,true,"#000", false, "#000", "#000", false);
        screenManager.loginButton = "";
        this.pressedLast = 0;
        this.buttons = [
            new Button(700,460,140,60,0,true,"#fff", false, "#000", "#007700", "Login", 40),
            new Button(80,350,400,100,0,true,"#000", false, "#fff", "#fff", "",0), 
            new Button(80,550,400,100,0,true,"#000", false, "#fff", "#fff", "",0),
            new Button(windowWidth-80,0,80,30,0,true,"#fff", false, "#ff0000", "#aa0000", "Back",20)
        ];
        screenManager.textbox.line = true;
    }

    draw() {
        background("#eeeee4");
        textSize(100);
        textAlign(CENTER, CENTER);
        fill("#000")
        text("Login Screen", 0, 0, windowWidth - 600, windowHeight/5);
        textSize(20);
        text("Username", 135, 325);
        text("Password", 135, 525);
        text("Please Enter Your Username And Password", 0, 150, windowWidth-600, windowHeight-700)
        for (let i = 0; i < this.buttons.length; i++) {
            this.buttons[i].draw()
        }
        screenManager.textbox.draw();
        screenManager.textbox2.draw();
        if (this.buttons[0].isPressed()) {
            api.login();
            screenManager.setScreen(new StartScreen());
        } else if (this.buttons[1].isPressed()) {
            this.pressedLast = 0;
            screenManager.textbox.line = true;
            screenManager.textbox2.line = false;
        } else if (this.buttons[2].isPressed()) {
            this.pressedLast = 1;
            screenManager.textbox.line = false;
            screenManager.textbox2.line = true;
        } else if (this.buttons[3].isPressed()) {
            screenManager.setScreen(new StartScreen());
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