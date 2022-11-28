/**
 * @file   This file provides the user with their profilescreen, where they can see their own tests
 * @author Arlo Filley
 * 
 * TODO:
 *      - change button name
 *      - provide filters for tests
 *      - implement a way to scroll through tests
 *      - create a way to have personal bests and track them
 *      - store tests in localstorage.
 *      - show user tests even if they are not logged in
 */

/**
 * This class displays all of the test data for a given user
 */
class ProfileScreen {
    constructor() {
        this.menu = new Menu();
        api.getUserTests();
    }

    draw() {
        background("#eeeee4");
        textSize(100);
        textAlign(CENTER, CENTER);
        fill("#000");
        text("Profile", 0, 100, windowWidth, 120);

        this.menu.draw();

        textSize(20);
        fill("#000");
        if (user.tests != undefined) {
            for (let i = 0; i < user.tests.length; i++) {
                text(`Test ${i+1}: ${user.tests[i].wpm}wpm | Characters Typed: ${user.tests[i].test_length}`, 0, i*30+300, windowWidth, 30);
            }
        }
        fill("#000");
        text(`Logged in as ${user.username}`, windowWidth-400, 15);
    }
}