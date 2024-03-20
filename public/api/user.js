/**
 * @file   This file provides an abstraction of all the data about the user
 * @author Arlo Filley
 */

/**
 * this class displays a number of textboxes that allows the user to input a
 * username and password. Then find out the user_id of that account through the 
 * necessary api routes.
 */
class User {
    constructor() {
        this.username = "not logged in";
        this.userId = 0;
        this.secret;

        this.leaderboard;
        this.time = 15;

        this.tests;
        this.lastTest;
        this.nextTest = null;
        this.colorScheme = {
            background: "#121212",
            text: "#AAA",

            timerBar: "#50C5B7",
            timerText: "#000",

            testGood: "#0A0",
            testBad: "#A00",

            buttonBG: "#12202f",
            buttonText: "#fff",
            buttonBorder: "#000",

            buttonHoverBG: "#FFF",
            buttonHoverText: "#000",
            buttonHoverBorder: "#000"
        }
    }
}