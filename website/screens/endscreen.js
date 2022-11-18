class EndScreen {
    constructor() {
        this.buttons = [
            new Button(0,0,100,30,0,true,"#fff",false,"#000","#000","Sign Up"),
            new Button(110,0,100,30,0,true,"#fff",false,"#000","#000","Login"),
            new Button(220,0,100,30,0,true,"#fff",false,"#000","#000","Logout"),
            new Button(330,0,100,30,0,true,"#fff",false,"#000","#000","Profile"),
            new Button(440,0,100,30,0,true,"#fff",false,"#000","#000","Test"),
            new Button(550,0,140,30,0,true,"#fff",false,"#000","#000","Leaderboard"),
        ]
    }
    
    draw() {
        background("#eeeee4");
        textSize(100);
        textAlign(CENTER, CENTER);
        fill(0);
        text("Test Complete\nPress enter to start another test", 0, 0, windowWidth - 100, windowHeight - 100);
        
        for (let i = 0; i < this.buttons.length; i++) {
            this.buttons[i].draw()
        }
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
        } else if (this.buttons[5].isPressed()) {
            screenManager.setScreen(new LeaderboardScreen())
        }
    }

    letterTyped(key) {
        if (key === "ENTER") screenManager.setScreen(new StartScreen());
    }
}