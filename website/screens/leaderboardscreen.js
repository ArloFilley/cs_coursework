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
        api.getLeaderBoard()
    }

    draw() {
        background("#eeeee4");
        textSize(100);
        textAlign(CENTER, CENTER);
        fill("#000");
        text("Leaderboard", 0, 100, windowWidth, 120);
        this.menu.draw();

        textSize(20);
        fill("#000");
        if (user.leaderboard != undefined) {
            for (let i = 0; i < user.leaderboard.length; i++) {
                text(`#${i+1}: ${user.leaderboard[i].username} : ${user.leaderboard[i].wpm}wpm`, 0, i*30+300, windowWidth, 30);
            }
        }
        fill("#000");
        text(`Logged in as ${user.username}`, windowWidth-400, 15);
    }
}