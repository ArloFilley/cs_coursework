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