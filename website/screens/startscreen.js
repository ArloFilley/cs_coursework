class StartScreen {
    constructor() {
        screenManager.textbox = new Textbox(windowWidth / 3,windowHeight / 2, windowWidth / 3, windowHeight / 2,0, true,"#000", true, "#000", "#000");
    }
    
    draw() {
        background("#eeeee4");
        textSize(50);
        textAlign(CENTER, CENTER);
        text("Type a nickname then\nPress enter to start a typing test", 0, 0, windowWidth, windowHeight / 2);
        screenManager.textbox.draw(false);
    }
}