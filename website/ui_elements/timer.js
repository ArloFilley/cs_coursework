class Timer {

    constructor(pX, pY, pWidth, pHeight, pLayer, pVisible, pTextColor, pBorder, pBorderColor, pBackgroundColor, pTime, pBar) {
        this.x = pX;
        this.y = pY;
        this.width = pWidth;
        this.height = pHeight;
        this.layer = pLayer;
        this.visible = pVisible;
        this.textColor = pTextColor;
        this.border = pBorder;
        this.borderColor = pBorderColor;
        this.backgroundColor = pBackgroundColor;

        this.bar = pBar;
        this.startTime;
        this.time = pTime;
        this.timeElapsed;
    }

    getX() {
        return this.x;
    }

    setX(pX) {
        this.x = pX;
    }

    getY() {
        return this.y;
    }

    setY(pY) {
        this.y = pY;
    }

    getWidth() {
        return this.width;
    }

    setWidth(pWidth) {
        this.width = pWidth;
    } 

    getHeight() {
        return this.height;
    } 

    setHeight(pHeight) {
        this.height = pHeight;
    } 

    getLayer() {
        return this.layer;
    } 

    setLayer(pLayer) {
        this.layer = pLayer;
    } 

    getVisible() {
        return this.visible;
    } 

    setVisible(pVisible) {
        this.visible = pVisible;
    } 

    getTextColor() {
        return this.textColor;
    } 

    setTextColor(pTextColor) {
        this.textColor = pTextColor;
    } 

    getBorder() {
        return this.border;
    } 

    setBorder(pBorder) {
        this.border = pBorder;
    } 

    getBorderColor() {
        return this.borderColor;
    } 

    setBorderColor(pBorderColor) {
        this.borderColor = pBorderColor;
    } 

    getBackgroundColor() {
        return this.backgroundColor;
    } 

    setBackgroundColor(pBackgroundColor) {
        this.backgroundColor = pBackgroundColor;
    }

    // time is the amount of seconds that the test should take
    getTime() {
        return this.time;
    }

    setTime(pTime) {
        this.time = pTime;
    }

    // when the timer needs to be started this method is called
    start() {
        this.startTime = frameCount; 
        // framecount is a special p5 value that counts the number of frames that have passed
        // I am using the amount of frames passed to calculate the time, assuming that the website is running at 240 frames
        // per second
        this.timeElapsed = 0;
    }

    // this function should be called once per frame
    tick() {
        this.timeElapsed = frameCount - this.startTime;
    }

    // currently just displays the amount of time left in seconds
    draw() {
        text((this.time * 60 - this.timeElapsed) / 60, this.x, this.y)
    }
}