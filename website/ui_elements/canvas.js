class Canvas {
    constructor() {
        this.x = 0;
        this.y = 0;
        this.canvas = createCanvas(0, 0);
    }


    center() {
        this.canvas.position(this.x, this.y);
    }


    resize() {
        this.canvas.resize(windowWidth, windowHeight);
    }

    disable() {
        this.canvas.resize(0, 0);
    }
}