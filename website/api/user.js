/**
 * @file   This file provides an abstraction of all the data about the user
 * @author Arlo Filley
 * 
 * TODO:
 *      - save user preferences about colours
 *      - make greater useage of localstorage to store tests before signup/login
 *        and post them to the database if a login is made.
 */

/**
 * this class displays a number of textboxes that allows the user to input a
 * username and password. Then find out the user_id of that account through the 
 * necessary api routes.
 */
class User {
    constructor() {
        this.username = "not logged in";
        this.password = "there";
        this.userId = 0;
        this.leaderboard;
        this.time = 15;

        this.tests;
        this.lastTest;
        this.nextTest = `satisfy powerful pleasant bells disastrous mean kited is gusted romantic past taste immolate productive leak close show crabby awake handsails finicky betray long-term incompetent wander show manage toys convey hop constitute number send like off ice aboard well-made vast vacuous tramp seed force divergent flower porter fire untidy soggy fetch`;
    }
}