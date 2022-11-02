class ScreenManager {
    constructor() {
        this.textbox;
        this.textbox2;
        this.timer;
        this.screen;
        this.loginButton;
        this.signupButton;
        this.profileButton;
    }

    draw() {
        this.screen.draw();
    }

    setScreen(pScreen) {
        this.screen = pScreen;
    }

    getScreen() {
        return this.screen;
    }
    
    letterTyped(key) {
        this.screen.letterTyped(key);
    }
}