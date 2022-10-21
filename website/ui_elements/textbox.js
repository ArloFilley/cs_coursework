class Textbox {
    constructor(pX, pY, pWidth, pHeight, pLayer, pVisible, pTextColor, pBorder, pBorderColor, pBackgroundColor) {
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

        this.testContent =
        `never which however are where all part person can late high head turn man tell first stand begin thing real course here must set they a get through about school fact of stand late who any of find change very they present day each much must she would follow help go think so`
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

    letterTyped(pKey) {
        if (pKey === "Enter" && screenManager.screen.constructor.name === "StartScreen") {
            if (screenManager.textbox.getLetters().length === 0) {
                alert(`please enter a name before starting the test`);
                return;
            }
            screenManager.name = screenManager.textbox.getLetters();
            screenManager.setScreen(new TestScreen());
            return;
        } else if (pKey === "Enter" && screenManager.screen.constructor.name === "EndScreen") {
            screenManager.name = "";
            screenManager.setScreen(new StartScreen());
            return;
        }

        if (pKey === "Backspace" && this.letters.length > 1) {
           this.letters.pop();
           return;
        }
        
       for (let i = 0; i < this.allowedLetters.length; i++) {
           if (pKey.toLowerCase() === this.allowedLetters[i]) {
               this.letters.push(pKey);
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

    draw(testcontent) {
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
        textSize(30);
        textAlign(LEFT);
        // font needs to be monospaced for outputting text to the screen like I do
        textFont('monospace');
        
        // these variables allow me to use the values of x and y while updating them
        let i = this.x;
        let j = this.y;

        if (testcontent) {
            // currently this loop just prints out every letter in the array, including any enter characters
            for (let x = 0; x < this.testContent.length; x++) {
                if (i > this.x + this.width) i = this.x, j += 30;
                if (this.testContent[x] === "Enter") { 
                    i = this.x, j+= 30;
                } else {
                    text(this.testContent[x], i, j);
                    i += 15
                }
            }

            i = this.x;
            j = this.y;

            // currently this loop just prints out every letter in the array, including any enter characters
            for (let x = 0; x < this.letters.length; x++) {
                if (i > this.x + this.width) i = this.x, j += 30;
                if (this.letters[x] == this.testContent[x]) {
                    fill("green");
                    text(this.letters[x], i, j);
                } else {
                    fill("red");
                    text(this.testContent[x], i, j);
                }
                if (x == this.letters.length - 1 || this.letters.length == 0) {
                    fill("black");
                    rect(i+15, j-15, 2, 30);
                }
                i += 15
            }
        } else {
            for (let x = 0; x < this.letters.length; x++) {
                if (i > this.x + this.width) i = this.x, j += 30;
                if (this.letters[x] === "Enter") { 
                    i = this.x, j+= 30;
                } else {
                    text(this.letters[x], i, j);
                    i += 15
                }
            }
        }
        
    }
}