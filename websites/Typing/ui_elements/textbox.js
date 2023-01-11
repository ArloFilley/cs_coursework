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
        pTextColor = user.colorScheme.text, 
        pBorder, pBorderColor, 
        pBackgroundColor, 
        pLine, pIsTest,
        pIsPassword = false
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
        this.allowedLetters = [
            'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k',
            'l', 'm','n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w',
            'x', 'y', 'z', 
            '1', '2', '3', '4', '5', '6', '7', '8', '9', '0',
            '\'', '"', ',', '.', ' ', '!', '@', '$', '%', '^', '&', '*', '(', ')',
        ]

        this.line = pLine;
        this.isTest = pIsTest;

        if (this.isTest) {
            this.testContent = user.nextTest;
            this.currentLine = 0;
            this.words = [""];
        } else {
            this.words = "";
        }

        this.isPassword = pIsPassword;

        this.goodColor = user.colorScheme.testGood;
        this.badColor = user.colorScheme.testBad;
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

            if (this.isTest) {
                this.words[this.currentLine] = this.words[this.currentLine].substring(0, this.words[this.currentLine].length-1);
            } else {
                this.words = this.words.substring(0, this.words.length-1)
            }
           return;
        }
        
        for (let i = 0; i < this.allowedLetters.length; i++) {
           if (pKey.toLowerCase() === this.allowedLetters[i]) {
               this.letters.push(pKey);
               if (this.isTest) {
                this.words[this.currentLine] += pKey;
               } else {
                this.words += pKey;
               }
               return;
            }    
        }
    }

    getWords() {
        let text = "";
        for (let i = 0; i < this.words.length; i++) {
            text += this.words[i];
        }
        return text;
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

    getTestContent() {
        let text = "";
        for (let i = 0; i < this.testContent.length; i++) {
            text += this.testContent[i];
        }
        return text;
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
        if (this.words.length === 0 && this.line) {
            fill("#000")
            rect(this.x, this.y-15, 1, 30)
        }
        
        // these variables allow me to use the values of x and y while updating them
        let i = this.x;
        let j = this.y;

        if (this.isTest) {
            let i = this.x;
            let j = this.y;

            if (this.words[this.currentLine].length >= this.testContent[this.currentLine].length) {
                this.currentLine++;
                this.words.push("");
            }

            if (this.currentLine > 0) {
                for (let x = 0; x < this.testContent[this.currentLine-1].length; x++) {
                    if (x < this.words[this.currentLine-1].length) {
                        if (this.words[this.currentLine-1][x] === this.testContent[this.currentLine-1][x]) {
                            fill("#00AA0044");
                        } else {
                            fill("#AA000044");
                        }
                    } else {
                        fill("#00044");
                    }
                    text(this.testContent[this.currentLine-1][x], i, j);
                    i += 13;
                }
                j+= 30;
            }
            
            i = this.x;

            for (let x = 0; x < this.testContent[this.currentLine].length; x++) {
                if (x < this.words[this.currentLine].length) {
                    if (this.words[this.currentLine][x] === this.testContent[this.currentLine][x]) {
                        fill(this.goodColor);
                    } else {
                        fill(this.badColor);
                    }
                } else {
                    fill(this.textColor);
                }
                text(this.testContent[this.currentLine][x], i, j);
                i += 13;
            }

            i = this.x;
            j += 30;

            fill(this.textColor);
            for (let x = this.currentLine + 1; x < this.testContent.length; x++) {
                text(this.testContent[x], i, j);
                j += 30;
            }

        } else if (this.isPassword) {
            // these variables allow me to use the values of x and y while updating them
            let i = this.x;
            let j = this.y;

            // currently this loop just prints out every letter in the array, including any enter characters
            for (let x = 0; x < this.letters.length; x++) {
                if (i > this.x + this.width) i = this.x, j += 30;
                if (this.letters[x] === "Enter") { 
                    i = this.x, j+= 30;
                } else {
                    let char = "-";
                    text(char, i, j);
                    i += 13
                }
                if (this.letters.length > 0 && x == this.letters.length-1 && this.line) {
                    fill(this.textColor)
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
                    fill(this.textColor)
                    rect(i, j-15, 1, 30)
                }
            }
        }
    }
}