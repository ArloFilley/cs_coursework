class ProfileScreen { 
    constructor() {
        screenManager.textbox = new Textbox(0,0,0,0,0,false,"#000", false, "#000", "#000", false);
        screenManager.loginButton = new Button(windowWidth-100,0,100,30,0,true,"#fff", false, "#000", "#000", "Back", 20);

        this.buttons = [];
        this.tests = []; 
        if (api.userId > 0) {
            api.getUserTests();
        }
    }

    draw() {
        background("#eeeee4");
        textSize(100);
        textAlign(CENTER, CENTER);
        fill("#000")
        text("Profile Screen", 0, 0, windowWidth, windowHeight/5);
        textSize(40);
        text("Tests", 0, 150, 150, 46)
        screenManager.textbox.draw();
        screenManager.loginButton.draw();
        if (screenManager.loginButton.isPressed()) {
            screenManager.setScreen(new StartScreen());
        }

        for (let i = 0; i < this.buttons.length; i++) {
            this.buttons[i].draw()
        }

        if (api.userId > 0 && this.buttons.length == 0) {
            this.addButtons();
        }
    }

    letterTyped() {

    }
    
    addButtons() {
        for (let i = 0; i < this.tests.length; i++) {
            this.buttons.push(new Button(20,40*i+200,150,30,0,true,"#000", false, "#000", "#44ee00", `${i+1}: ${this.tests[i].wpm}wpm`, 20));
        }
    }
}