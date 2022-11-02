class ProfileScreen { 
    constructor() {
        screenManager.textbox = new Textbox(0,0,0,0,0,false,"#000", false, "#000", "#000", false);
        screenManager.loginButton = new Button(windowWidth-100,0,100,30,0,true,"#fff", false, "#000", "#000", "Back");
        this.tests; 
        api.getUserTests();
    }

    draw() {
        background("#eeeee4");
        textSize(100);
        textAlign(CENTER, CENTER);
        fill("#000")
        text("Profile Screen", 0, 0, windowWidth -400, windowHeight/5);
        textSize(20);
        text("Tests", 0, 150, windowWidth-600, windowHeight-700)
        screenManager.textbox.draw();
        screenManager.loginButton.draw();
        if (screenManager.loginButton.isPressed()) {
            screenManager.setScreen(new StartScreen());
        }

        textSize(30);
        fill("black")
        for (let i = 0; i < this.tests.length; i++) {
            text(`test ${i}: ${this.tests[i].wpm}wpm`,200,40*i+200);
        }
    }
}