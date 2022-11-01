class LoginScreen { 
    constructor() {
        screenManager.textbox = new Textbox(100,400,400,400,0,true,"#000", false, "#000", "#000");
        screenManager.loginButton = new Button(windowWidth-70,0,70,30,0,true,"#fff", false, "#000", "#000", "Login");
    }

    draw() {
        background("#eeeee4");
        textSize(100);
        textAlign(CENTER, CENTER);
        fill("#000")
        text("Login Screen", 0, 0, windowWidth -600, windowHeight/5);
        textSize(20);
        text("Please Enter Your Username And Password", 0, 150, windowWidth-600, windowHeight-700)
        screenManager.textbox.draw();
        screenManager.loginButton.draw();
        if (screenManager.loginButton.isPressed()) {
            api.login();
        }
    }
}