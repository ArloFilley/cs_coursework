class StartScreen {
    constructor() {
        screenManager.textbox = new Textbox(windowWidth / 3,windowHeight / 2, windowWidth / 3, windowHeight / 2,0, true,"#000", true, "#000", "#000");
    }
    
    draw() {
        background("#eeeee4");
        textSize(50);
        textAlign(CENTER, CENTER);
        noStroke();
        fill("#be4d25");
        text("See how fast you are at typing",0, 0, windowWidth, 200);
        textSize(30);
        fill("black");
        text("Type a nickname then\nPress enter to start the typing test", 0, 0, windowWidth, windowHeight / 2);
        screenManager.textbox.draw(false);
    }
}