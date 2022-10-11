class ScreenManager {
    constructor() {
        this.textbox;
        this.timer;
        this.screen;
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
}