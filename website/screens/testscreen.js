class TestScreen {
    constructor() {
        this.textbox = new Textbox(100,100,windowWidth - 100,windowHeight,0,true,"#000", false, "#000", "#000");
        screenManager.timer = new Timer(0,0,windowWidth,50,0,true,"#fff", true, "#000", "#666", 15, true);
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