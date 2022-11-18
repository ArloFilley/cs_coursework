class EndScreen {
    constructor() {
        this.menu = new Menu();
    }
    
    draw() {
        background("#eeeee4");
        textSize(100);
        textAlign(CENTER, CENTER);
        fill(0);
        text("Test Complete\nPress enter to start another test", 0, 0, windowWidth - 100, windowHeight - 100);
        this.menu.draw();
    }

    letterTyped(key) {
        if (key === "Enter") screenManager.setScreen(new TestScreen());
    }
}