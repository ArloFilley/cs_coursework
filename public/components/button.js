/**
 * @file   This file provides the button class, which can
 *          be checked for clicks
 * @author Arlo Filley
 * 
 * TODO:
 *      - implement visual changes (borders, etc)
 *      - replace with methods with getters and setters
 */


/**
 * Button class, a rectangle that can be checked for mouse clicks
 */
class Button {
    // this is the doc comment for the Timer class
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
    * @param {string} Label
    */
    constructor(pX = 100, pY = 100, 
        pWidth = 200, pHeight = 30, 
        pLabel = "Default Button",

        pBorder = false,
        pHoverBorder = true,
    
        pTextColor = user.colorScheme.buttonText, 
        pBorderColor = user.colorScheme.buttonBorder, 
        pBackgroundColor = user.colorScheme.buttonBG, 

        pHoverTextColor = user.colorScheme.buttonHoverText, 
        pHoverBorderColor = user.colorScheme.buttonHoverBorder,
        pHoverBackgroundColor = user.colorScheme.buttonHoverBG,

        pLayer = 0, pVisible = true,
    ) {
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
        this.label = pLabel;
        
        // Attributes to control the look of the button
        // when the user is hovering over it
        this.hoverBorder = pHoverBorder;
        this.hoverBorderColor = pHoverBorderColor;
        this.hoverTextColor = pHoverTextColor;
        this.hoverBackgroundColor = pHoverBackgroundColor;
    }

    getx() {
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

    getLabel() {
        return this.label;
    }

    setLabel(pLabel) {
        this.label = pLabel;
    }

    /**
     * This functions returns more 
     */
    isPressed() {
        if (!this.visible) {
            return;
        } else if (!mouseIsPressed) {  // a unique p5.js value that checks if the mouse is clicked
            return false;
        }

        // if the mouse is within the bounds of the return that the button has been pressed
        if (mouseX > this.x && mouseX < this.x + this.width && mouseY > this.y && mouseY < this.y + this.height) {
            return true;
        }
        return false;
    }

    /**
     * This function draws the button with the label
     */
    draw() {
        if (!this.visible) {
            return;
        }
        textSize(20);
        textAlign(CENTER, CENTER);

        if (mouseX > this.x && mouseX < this.x + this.width && mouseY > this.y && mouseY < this.y + this.height) {

            if (this.hoverBorder) {
                strokeWeight(2);
                stroke(this.hoverBorderColor)
            } else {
                noStroke();
            }
            fill(this.hoverBackgroundColor);
            rect(this.x, this.y, this.width, this.height);

            noStroke();
            fill(this.hoverTextColor);
            text(this.label, this.x, this.y, this.width, this.height); 
        } else {
            if (this.border) {
                strokeWeight(2);
                stroke(this.borderColor)
            } else {
                noStroke();
            }

            fill(this.backgroundColor);
            rect(this.x, this.y, this.width, this.height);

            noStroke();
            fill(this.textColor);
            text(this.label, this.x, this.y, this.width, this.height); 
        }
        noStroke();
    }
}