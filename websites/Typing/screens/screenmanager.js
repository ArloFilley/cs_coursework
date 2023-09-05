/**
 * @file   This file provides the screen manager class, with the necassary code to switch between screen classes
 * @author Arlo Filley
 * 
 * TODO:
 *      - implement transitions between screens in a more fluid way
 */

/**
 * This class provides the ScreenManager class stores the current screen
 * and provides the getters and setters necessary to switch between screen classes
 * easily
 */
class ScreenManager {
    constructor() {
        this.textbox;
        this.timer;
        this.screen;
    }

    draw() {
        this.screen.draw();
    }

    setScreen(pScreen) {
        this.screen = pScreen;
    }

    getScreen() {
        return this.screen;
    }

    letterTyped(key) {
        let methods = Object.getOwnPropertyNames(Object.getPrototypeOf(this.screen));
        for (let i = 0; i < methods.length; i++) {
            if (methods[i] === "letterTyped") {
                this.screen.letterTyped(key)
            }
        }
    }
}