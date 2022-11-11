class EndScreen {
    constructor() {
        screenManager.textbox = new Textbox(0,0,0,0,0,false,"#000", false, "#000", "#000");
    }
    
    draw() {
        background("#eeeee4");
        textSize(100);
        textAlign(CENTER, CENTER);
        fill(0);
        text("Test Complete\nPress enter to start another test", 0, 0, windowWidth - 100, windowHeight - 100);
    }

    letterTyped() {
        screenManager.setScreen(new StartScreen());
    }
}