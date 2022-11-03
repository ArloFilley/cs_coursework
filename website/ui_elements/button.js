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
     constructor(pX, pY, pWidth, pHeight, pLayer, pVisible, pTextColor, pBorder, pBorderColor, pBackgroundColor, pLabel, pTextSize) {
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
        this.textSize = pTextSize;
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

    getLabel() {
        return this.label;
    }

    setLabel(pLabel) {
        this.label = pLabel;
    }

    /**
     * This functions returns more 
     * @returns 
     */
    isPressed() {
        if (!mouseIsPressed) {
            // a unique p5.js value that checks if the mouse is clicked
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
        textAlign(CENTER, CENTER);
        textSize(this.textSize);
        fill(this.backgroundColor);
        rect(this.x, this.y, this.width, this.height);

        fill(this.textColor);
        text(this.label, this.x, this.y, this.width, this.height); 
        // passing 4 arguments to this function means the text will wrap within this box
    }
}