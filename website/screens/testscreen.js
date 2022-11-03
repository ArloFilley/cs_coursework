class TestScreen {
    constructor() {
        screenManager.textbox = new Textbox(100,100,windowWidth - 200,windowHeight,0,true,"#000", false, "#000", "#000", true);
        screenManager.timer = new Timer(0,0,windowWidth,50,0,true,"#000", true, "#000", "#666", 15, true);
        screenManager.timer.start();
        screenManager.textbox.line = true;
    }

    draw() {
        background("#eeeee4");
        screenManager.textbox.draw();
        screenManager.timer.draw();
        screenManager.timer.tick();
    }

    letterTyped(key) {
        screenManager.textbox.letterTyped(key);
    }
}