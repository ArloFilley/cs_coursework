class StartScreen {
    constructor() {
        this.menu = new Menu();
    }
    
    draw() {
        background("#eeeee4");
        textSize(100);
        textAlign(CENTER, CENTER);
        fill("#000");
        text("Press enter to start test", 0, 0, windowWidth - 100, windowHeight - 100);
        
        this.menu.draw();

        fill("#000");
        text(`Logged in as ${user.username}`, windowWidth-400, 15);
    }

    letterTyped(key) {
        if (key === "Enter") {
            screenManager.setScreen(new TestScreen());
        }
    }
}