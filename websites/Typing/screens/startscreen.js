/**
 * @file   This file is the base screen when the user visits the site
 * @author Arlo Filley
 */

/**
 * This screen class is the base screen. It provides the user with basic instructions
 * and a set of menus to navigate the site
 */
class StartScreen {
    constructor() {
        this.menu = new Menu();
    }
    
    draw() {
        textSize(100);
        textAlign(CENTER, CENTER);
        fill(user.colorScheme.text);
        text("Press enter to start test", 0, 0, windowWidth - 100, windowHeight - 100);
        
        this.menu.draw();

        fill(user.colorScheme.text);
        text(`Logged in as ${user.username}`, windowWidth-150, 15);
    }

    letterTyped(key) {
        if (key === "Enter") {
            screenManager.setScreen(new TestScreen());
        }
    }
}