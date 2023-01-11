/**
 * @file   This file provides a canvas class wrapper for the p5.js canvas
 * @author Arlo Filley
 * 
 */

/**
 * this class provides a wrapper around the
 * p5.js canvas, with easier methods to work with.
 */
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