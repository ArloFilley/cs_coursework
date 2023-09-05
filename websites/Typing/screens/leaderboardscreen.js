/**
 * @file   This file provides a leaderboard for the user to compare times.
 * @author Arlo Filley
 * 
 * TODO:
 *      - implement a way for the user to scroll down the tests.
 *      - display more tests on the screen at once, up to 15
 *      - store the leaderboard in localstorage as a cache for the most recent results
 */

/**
 * this class is a screen which shows the current leaderboard from the
 * results gotten via the api. 
 */
class LeaderboardScreen {
    constructor() {
        this.menu = new Menu();
        api.getLeaderBoard();
        this.testButtons;
        // this.buttons = [
            // new Button(1150, 270, 240, 120, "up"),
            // new Button(1150, 390, 240, 120, "down"),
        // ]
        this.offset = 0;
        this.scroll_bar_button = new Button(1200, 200, 20, 20, "")
    }

    draw() {
        textSize(100);
        textAlign(CENTER, CENTER);
        fill(user.colorScheme.text);
        text("Leaderboard", 0, 100, windowWidth, 120);
        this.menu.draw();

        textSize(20);
        fill(user.colorScheme.text);
        if (user.leaderboard != undefined) {
            if (this.testButtons === undefined) {
                this.createTestButtons();
            }
        }

        fill(user.colorScheme.testBad);
        rect(1200, 270, 20, 420);

        fill(user.colorScheme.testGood);
        rect(1200, 270, 20, 420 / user.leaderboard.length * (this.offset + 1));
        this.scroll_bar_button.height = (user.leaderboard.length)

        if (this.scroll_bar_button.isPressed()) {
            this.scroll_bar_button.y = mouseY - this.scroll_bar_button.height / 2;
        }

        // the furthest up the scrollbar can go is the top
        if (this.scroll_bar_button.y < 270) {
            this.scroll_bar_button.y = 270;
        }

        if (this.scroll_bar_button.y > 690 - this.scroll_bar_button.height) {
            this.scroll_bar_button.y = 690 - this.scroll_bar_button.height;
        }
        this.scroll_bar_button.draw();

        if (this.testButtons !== undefined && this.testButtons.length > 1) {
            for (let i = 0; i < this.testButtons.length; i++) {
                this.testButtons[i][0].draw()
                this.testButtons[i][1].draw()
                this.testButtons[i][2].draw()
            }

            this.offset = Number((
                // number of pixels from top of screen / total range of options, put to a whole integer to produce the correct offset
                (this.scroll_bar_button.y - 270) / ((420 - this.scroll_bar_button.height)  / (user.leaderboard.length - 13))
            ).toFixed(0));

            this.createTestButtons(this.offset)
        } else {
            fill(user.colorScheme.text);
            text("Looks Like There Isn't A Leaderboard", windowWidth / 2, 300);
        }
        fill(user.colorScheme.text);
        text(`Logged in as ${user.username}`, windowWidth-150, 15);
    }

    createTestButtons(offset = 0) {
        this.testButtons = [[
            new Button(400, 270, 100, 30, "ranking"), // test # button
            new Button(500, 270, 400, 30, "username"), // wpm button
            new Button(900, 270, 240, 30, "words per minute"), // accuracy button
        ]];
        let j = 300;
        for (let i = 0 + offset; i < user.leaderboard.length && i <= 12+offset; i++) {
            this.testButtons.push([
                new Button(400, j, 100, 30, `${i+1}`,                          true, true, "#000", "#000", "#fff"), // test # button
                new Button(500, j, 400, 30, `${user.leaderboard[i].username}`, true, true, "#000", "#000", "#fff"), // accuracy button
                new Button(900, j, 240, 30, `${user.leaderboard[i].wpm}`,      true, true, "#000", "#000", "#fff"), // wpm button
            ])
            j+=30;
        }
    }
}