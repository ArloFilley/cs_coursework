class TestScreen {
    constructor() {
        this.textbox = new Textbox(100,100,windowWidth - 200,windowHeight,0,true,"#000", false, "#000", "#000", true, true);
        screenManager.timer = new Timer(0,0,windowWidth,50,0,true,"#fff", true, "#000", "#666", user.time, true);
        screenManager.timer.start();
    }

    draw() {
        background("#eeeee4");
        this.textbox.draw();
        screenManager.timer.draw();
        screenManager.timer.tick();
    }

    letterTyped(key) {
        this.textbox.letterTyped(key);
    }
}