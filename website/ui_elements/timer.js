/**
 * @file   This file provides a time menu class for editing the length of a test
 * @author Arlo Filley
 * 
 * TODO:
 *      - implement visual changes (borders, etc)
 *      - fix the timer number becoming invisible after a
 *        it drops below a certain amount of time
 *      - use getters and setters
 *      - use the millis() p5.js function for if the framerate becomes
 *        slowed down by the amount being drawn to the screen
 */

/**
 *  This class provides the timer, which handles when a test starts and ends as well
 *  as providing a visual element for the user to see
 */
class Timer {
    /**
    * @param {int} pX 
    * @param {int} pY 
    * @param {int} pWidth 
    * @param {int} pHeight 
    * @param {int} pLayer 
    * @param {bool} pVisible 
    * @param {hexcode} pTextColor 
    * @param {bool} pBorder 
    * @param {hexcode} pBorderColor 
    * @param {hexcode} pBackgroundColor 
    * @param {int} pTime 
    * @param {bool} pBar 
    */
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
        this.timeElapsed = 0;
        this.ended;
        this.hasStarted = false;
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

    /**
     * gets the amount of time the timer will run for
     */
    getTime() {
        return this.time;
    }

    /**
     * sets the amount of time the timer will run for
     * @param {int} pTime 
     */
    setTime(pTime) {
        this.time = pTime;
    }

    /**
     * This method is called to start the timer
     */
    start() {
        this.startTime = millis(); 
        // framecount is a special p5 value that counts the number of frames that have passed
        // I am using the amount of frames passed to calculate the time, assuming that the website is running at 60q frames
        // per second
        this.timeElapsed = 0;
        this.hasStarted = true;
    }

    /**
     * This method should be called once per frame
     * it keeps track of the amount of time passed
     */
    tick() {
        this.timeElapsed = (millis() - this.startTime) / 1000;
        if (this.timeElapsed >= this.time) {
            this.end();
        };
    }

    /**
     * this function is called at the end of the timer
     */
    end() {
        this.visible = false;
        api.validateTest();
        this.timeElapsed = 0;
        this.time = 0;
        api.getTest();
        // Then this function will call all other functions necessary to complete the test
        // this will likely including changing the screen and interacting with the api
        screenManager.setScreen(new EndScreen());
    }

    /**
     * Draws the timer, uses the attributes of the class as options
     */
    draw() {
        // if the time shouldn't be rendered it quickly exits out of this method
        if (!this.visible) return;
        textAlign(LEFT);

        // adds a border for the bar if one is needed
        if (this.border && this.bar) {
            strokeWeight(1);
            stroke(this.borderColor); 
            // this doesn't use the fill function like other drawings
            // but this adds the necessary color to the border
        } else {
            noStroke();
        }

        // draws a bar that move across the screen to show the time left
        if (this.bar) {
            fill(user.colorScheme.timerBar);
            if (this.hasStarted) {
                rect(this.y, this.x, windowWidth - windowWidth * (this.timeElapsed / this.time), this.height);
            } else {
                rect(this.y, this.x, windowWidth, this.height);
            }
        }

        // draws the text in the corner of the screen
        noStroke();
        fill(user.colorScheme.timerText);
        if (this.hasStarted) {
            text(Math.ceil(this.time - this.timeElapsed), this.x + this.width / 6, this.y + this.height / 2);
        } else {
            text("Type A Letter To Start", this.x + this.width / 6, this.y + this.height / 2);
        }
    }
}