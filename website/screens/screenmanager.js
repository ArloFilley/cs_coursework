class ScreenManager {
    constructor() {
        this.textbox = new Textbox(400, 200, 700);
        this.timer = new Timer(0, 0, 100, 100, 0, true, '#000', true, '#000','#F3C969', 10, true);
        this.button = new Button(300, 300, 100, 50, 0, true, '#fff', false, '#000', '#666', 'button');
    }

    draw() {
        this.textbox.draw();
        this.timer.draw();
        this.button.draw();
    }
}