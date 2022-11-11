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

    letterTyped(key) {
        let methods = Object.getOwnPropertyNames(Object.getPrototypeOf(this.screen));
        for (let i = 0; i < methods.length; i++) {
            if (methods[i] === "letterTyped") {
                this.screen.letterTyped(key)
            }
        }
    }
}