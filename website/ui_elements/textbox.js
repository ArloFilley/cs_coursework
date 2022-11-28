/**
 * @file   This file provides the textbox class for taking user input
 * @author Arlo Filley
 * 
 * TODO:
 *      - add all characters a user could press
 *      - refactor the code displaying the characters. It can become slow after lots of typing
 *      - password mode, where the charcters are hidden from the user
 *      - getters and setters
 */

/**
 *  This class takes input from the user and displays it some form
 *  it handles the test input from the user, and the login and sign
 *  up pages.
 */
class Textbox {
    /**
     * Creates a new instance of the Textbox class
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
     */
    constructor(
        pX, pY, 
        pWidth, pHeight, 
        pLayer, pVisible, 
        pTextColor, 
        pBorder, pBorderColor, 
        pBackgroundColor, 
        pLine, pIsTest
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

        this.letters = [];
        this.words = "";
        this.allowedLetters = [
            'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k',
            'l', 'm','n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w',
            'x', 'y', 'z', '\'', '"', ',', '.', ' '
        ]

        this.line = pLine;
        this.isTest = pIsTest;

        if (this.isTest) {
            this.testContent = user.nextTest;
        }
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

    getLetters() {
        return this.letters;
    }
    
    setLetters(pLetters) {
        this.letters = pLetters;
    }

    /**
     * takes a key and handles it in the textbox
     * @param {String} pKey 
     * @returns 
     */
    letterTyped(pKey) {
        if (pKey === "Backspace" && this.letters.length > 0) {
           this.letters.pop();
           this.words = this.words.substring(0, this.words.length-1)
           return;
        }
        
        for (let i = 0; i < this.allowedLetters.length; i++) {
           if (pKey.toLowerCase() === this.allowedLetters[i]) {
               this.letters.push(pKey);
               this.words += pKey;
               return;
            }    
        }
    }

    getWords() {
        return this.words;
    }

    setWords(pWords) {
        this.words = pWords;
    }

    getAllowedLetters() {
        return this.allowedLetters;
    }

    setAllowedLetters(pAllowedLetters) {
        this.allowedLetters = pAllowedLetters;
    }

    /**
     * draws a Textbox
     * @returns 
     */
    draw() {
        // doesn't render the textbox if it should not be visible to the user.
        if (!this.visible) {
            return;
        }

        noStroke();
        // sets a border if there should be one
        if (this.border) {
            stroke(this.borderColor);
            strokeWeight(1);
        }
        
        // sets the parameters of what the text should look like;
        fill(this.textColor);
        textSize(23);
        textAlign(LEFT);
        if (this.words.length == 0 && this.line) {
            fill("#000")
            rect(this.x, this.y-15, 1, 30)
        }
        
        // these variables allow me to use the values of x and y while updating them
        let i = this.x;
        let j = this.y;

        if (this.isTest) {
            let i = this.x;
            let j = this.y;

            // currently this loop just prints out every letter in the array, including any enter characters
            for (let x = 0; x < this.testContent.length; x++) {
                if (i > this.x + this.width) i = this.x, j += 30;
                if (this.testContent[x] === "Enter") { 
                    i = this.x, j+= 30;
                } else {
                    text(this.testContent[x], i, j);
                    i += 13
                }
            }

            // these variables allow me to use the values of x and y while updating them
            i = this.x;
            j = this.y;

            // currently this loop just prints out every letter in the array, including any enter characters
            for (let x = 0; x < this.letters.length; x++) {
                if (i > this.x + this.width) i = this.x, j += 30;
                if (this.letters[x] === "Enter") { 
                    i = this.x, j+= 30;
                } else {
                    if (this.letters[x] === this.testContent[x]) {
                        fill('green');
                    } else {
                        fill('red');
                    }
                    text(this.testContent[x], i, j);
                    i += 13
                }
                if (this.letters.length > 0 && x == this.letters.length-1 && this.line) {
                    fill("black")
                    rect(i, j-15, 1, 30)
                }
            }
        } else {
            // these variables allow me to use the values of x and y while updating them
            let i = this.x;
            let j = this.y;

            // currently this loop just prints out every letter in the array, including any enter characters
            for (let x = 0; x < this.letters.length; x++) {
                if (i > this.x + this.width) i = this.x, j += 30;
                if (this.letters[x] === "Enter") { 
                    i = this.x, j+= 30;
                } else {
                    text(this.letters[x], i, j);
                    i += 13
                }
                if (this.letters.length > 0 && x == this.letters.length-1 && this.line) {
                    fill("black")
                    rect(i, j-15, 1, 30)
                }
            }
        }
    }
}