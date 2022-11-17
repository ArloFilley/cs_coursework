class EndScreen {
    constructor() {
        this.buttons = [
            new Button(0,0,100,30,0,true,"#fff",false,"#000","#000","Sign Up"),
            new Button(110,0,100,30,0,true,"#fff",false,"#000","#000","Login"),
            new Button(220,0,100,30,0,true,"#fff",false,"#000","#000","Logout"),
            new Button(330,0,100,30,0,true,"#fff",false,"#000","#000","Profile")
        ]
    }
    
    draw() {
        background("#eeeee4");
        textSize(100);
        textAlign(CENTER, CENTER);
        fill(0);
        text("Test Complete\nPress enter to start another test", 0, 0, windowWidth - 100, windowHeight - 100);
        this.buttons[0].draw();
        this.buttons[1].draw();
        this.buttons[2].draw();
        this.buttons[3].draw();
        this.buttons[4].draw();
        if (this.buttons[0].isPressed()) {
            screenManager.setScreen(new SignUpScreen());
        } else if (this.buttons[1].isPressed()) {
            screenManager.setScreen(new LoginScreen());
        } else if (this.buttons[2].isPressed()) {
            api.logout();
        } else if (this.buttons[3].isPressed()) {
            screenManager.setScreen(new ProfileScreen());
        } else if (this.buttons[4].isPressed()) {
            screenManager.setScreen(new TestScreen())
        }
    }

    letterTyped() {
        screenManager.setScreen(new StartScreen());
    }
}