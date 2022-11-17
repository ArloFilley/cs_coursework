class ProfileScreen {
    constructor() {
        this.buttons = [
            new Button(0,0,100,30,0,true,"#fff",false,"#000","#000","Sign Up"),
            new Button(110,0,100,30,0,true,"#fff",false,"#000","#000","Login"),
            new Button(220,0,100,30,0,true,"#fff",false,"#000","#000","Logout"),
            new Button(330,0,100,30,0,true,"#fff",false,"#000","#000","Profile"),
            new Button(440,0,100,30,0,true,"#fff",false,"#000","#000","Test"),
        ];
        api.getUserTests();
    }

    draw() {
        background("#eeeee4");
        textSize(100);
        textAlign(CENTER, CENTER);
        fill("#000");
        text("Profile", 0, 100, windowWidth - 100, 120);
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

        textSize(20);
        fill("#000");
        if (user.tests != undefined) {
            for (let i = 0; i < user.tests.length; i++) {
                text(`Tests ${i+1}: ${user.tests[i].wpm}wpm | Type: ${user.tests[i].test_type} | Time: ${user.tests[i].test_time} | Characters Typed: ${user.tests[i].test_length}`, 0, i*30+300, windowWidth, 30);
            }
        }
        fill("#000");
        text(`Logged in as ${user.username}`, windowWidth-100, 15);
    }
}