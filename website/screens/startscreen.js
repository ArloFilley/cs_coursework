class StartScreen {
    constructor() {
        screenManager.textbox = new Textbox(0,0,0,0,0,false,"#000", false, "#000", "#000");
    }
    
    draw() {
        background("#eeeee4");
        textSize(100);
        textAlign(CENTER, CENTER);
        text("Press enter to start test", 0, 0, windowWidth - 100, windowHeight - 100);
    }
}