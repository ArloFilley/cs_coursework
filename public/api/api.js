/**
 * @file   This file provides abstracted functions to interact with the api
 * @author Arlo Filley
 * 
 */

/**
 * This class provides all the useful methods to interact with the api.
 */
class API {
    
    constructor() { this.url = "/api"; }

    /**
     * This takes the validated data and makes a post
     * request to the rocket server
     * @param {String} testType 
     * @param {int} testLength 
     * @param {int} testTime 
     * @param {int} testSeed 
     * @param {int} quoteId 
     * @param {int} wpm 
     * @param {int} accuracy 
     * @param {int} userId 
     */
    postTest(pTestType, pTestLength, pTestTime, pTestSeed, pQuoteId, pWpm, pAccuracy, pUserId) {
        const data = {
            'test_type': pTestType,
            'test_length': pTestLength,
            'test_time': pTestTime,
            'test_seed': pTestSeed,
            'quote_id': pQuoteId,
            'wpm': pWpm,
            'accuracy': pAccuracy,
            'user_id': pUserId,
            'secret': user.secret
        }

        const xhr = new XMLHttpRequest();
        xhr.open(
            "POST", 
            `${this.url}/post_test/`
        );

        xhr.send(
            JSON.stringify(data)
        );

        user.lastTest = data;
    }

    /**
     * Validates all the parameters used for the postTest function which it then calls
     */
    validateTest() {
        const test = screenManager.screen.textbox.getWords();
        const testType = "words";
        let testLength = test.length;
        let testTime = screenManager.screen.timer.getTime();
        const testSeed = 0;
        const quoteId = 0;
        let wpm;
        const userId = Number(user.userId);
        let test_content = screenManager.screen.textbox.getTestContent();

        let string = "";
        let inaccurateLetters = 0;
        for (let letter = 0; letter < test.length; letter++) {
            if (test[letter] === test_content[letter]) {
                string += test[letter];
            } else {
                inaccurateLetters += 1;
            }
        }

        const accuracy = Math.round(((test.length - inaccurateLetters) / test.length) * 100);

        // this is the wpm calculation factoring in the time of test
        // it assumes that all words are 5 characters long because on average
        // they are
        wpm = Math.round((string.length / 5) * (60 / testTime));

        // the following code is a series of if statements that checks the
        // types of the variables is correct if not it errors it and returns
        // out of the function

        if ( typeof testType !== "string" ) {
            console.error(`testType is value ${typeof testType}\nshould be a string`);
            return;
        }
        if ( typeof testLength !== "number") {
            console.error(`testLength is value ${typeof testLength}\n should be a number`);
            return;
        }
        if ( typeof testTime !== "number") {
            console.error(`testTime is value ${typeof testTime}\n should be a number`);
            return;
        }
        if ( typeof testSeed !== "number") {
            console.error(`testSeed is value ${typeof testSeed}\n should be a number`);
            return;
        }
        if ( typeof quoteId !== "number") {
            console.error(`quoteId is value ${typeof quoteId}\n should be a number`);
            return;
        }
        if ( typeof wpm !== "number") {
            console.error(`wpm is value ${typeof wpm}\n should be a number`);
            return;
        }
        if ( typeof accuracy !== "number") {
            console.error(`accuracy is value ${typeof accuracy}\n should be a number`);
            return;
        }
        if ( typeof userId !== "number") {
            console.error(`userId is value ${typeof userId}\n should be a number`);
            return;
        }

        // after checking that all variables are of the correct type these if statements check
        // that they are acceptable values or are in acceptable bounds depending on variable types

        if (testType !== "words")  {
            // currently words is the only acceptable type but
            // this will change in later iterations

            console.error(`testType is invalid\nacceptable options ['words']`);
        }
        // upper bounds for these numbers are less of a concern because the server will automatically
        // return an error if values are over the limit
        if (testLength < 0) {
            console.error(`testLength is too small, min value 0`)
        }
        if (testTime < 1) {
            console.error(`testTime is too small, min value 1`)
        }
        if (testSeed < 0) {
            console.error(`testSeed is too small, min value 0`)
        }
        if (quoteId < 0) {
            console.error(`quoteId is too small, min value 0`)
        }
        if (wpm < 0) {
            console.error(`wpm is too small, min value 0`)
        }
        // accuracy needs an upper bound check because users can't have more than 100%
        // accuracy when completing their tests
        if (accuracy < 0) {
            console.error(`accuracy is too small, min value 0`)
        } else if (accuracy > 100) {
            console.error(`accuracy is too big, max value 100`)
        }
        if (userId < 0) {
            console.error(`userId is too small, min value 0`)
        }

        // there will be other tests here in later iterations but for now these tests should suffice

        this.postTest(testType, testLength, testTime, testSeed, quoteId, wpm, accuracy, userId);
    }

    /**
     * takes a validated name and password and sends
     * a post request to make a user with the given
     * username and password
     * @param {String} username 
     * @param {String} password 
     * @returns
     */
    createUser( username, password ) {
        console.log( username, password );
        const user = {
            username: username,
            password: password
        };

        const xhr = new XMLHttpRequest(); 
        xhr.open( "POST", `${this.url}/create_user/` );

        xhr.send( JSON.stringify(user) );

        xhr.onload = () => {
            if (xhr.status === 500) {
                alert("Sorry, looks like your username isn't unique");
                console.error("Sorry, looks like your username isn't unique")
            } else {
                this.login(username, password);
            }
        };
    }


    /**
     * takes a validated name and password and sends
     * a post request to make a user with the given
     * username and password
     * @param {String} username 
     * @param {String} password 
     * @param {boolean} initial
     * @returns
     */
    login(pUsername, pPassword, initial = false) {
        // If Local Storage has the information we need there is no need to make a request to the server
        if (localStorage.getItem("username") === pUsername || (initial && localStorage.length === 3) ) {
            user.userId = localStorage.getItem("userId");
            user.secret = localStorage.getItem("secret");
            user.username = localStorage.getItem("username");

            return
        }

        // Variable Validation
        if (pUsername == undefined || pPassword == undefined) {
            return
        }

        let xhr = new XMLHttpRequest();
        xhr.open('GET', `${this.url}/login/${pUsername}/${pPassword}`);
        xhr.send();
        xhr.onload = () => {
            let response = JSON.parse(xhr.response);

            // If there is an error with the login we need 
            if (xhr.response === null) {
                alert("Error Logging in, maybe check your password");
                return 
            }

            user.userId = response.user_id;
            user.username = pUsername
            user.secret = response.secret;

            localStorage.setItem("userId", user.userId);
            localStorage.setItem("username", pUsername);
            localStorage.setItem("secret", user.secret);
        };
    }

    logout() {
        user = new User();
        user.username = "no one";
        user.password = "";
        user.userId = 0;
        user.tests = [];
        localStorage.clear();
        this.getTest();
    }

    getUserTests() {
        if (user.userId === 0) {
            user.tests = undefined;
            return;
        }
        let xhr = new XMLHttpRequest();

        xhr.open('GET', `${this.url}/get_tests/${user.userId}/${user.secret}`);
        xhr.send();
        xhr.onload = () => {
            user.tests = JSON.parse(xhr.response);
        };
    }

    getLeaderBoard() {
        let xhr = new XMLHttpRequest();
        xhr.open('GET', `${this.url}/leaderboard/`);
        xhr.send();
        xhr.onload = () => {
            user.leaderboard = JSON.parse(xhr.response);
        };
    }

    getTest() {
        let xhr = new XMLHttpRequest();
        xhr.open('GET', `${this.url}/new_test/`);
        xhr.send();
        xhr.onload = () =>{
            const effectiveWidth = (windowWidth - 200) / 13;
            let textArr = JSON.parse(xhr.response);
            let finalText = [];
            let text = "";
            for (let i = 0; i < textArr.length; i++) {
                if (text.length + textArr[i].length < effectiveWidth) {
                    text += `${textArr[i]} `
                } else {
                    finalText.push(text.substring(0,text.length-1));
                    text = `${textArr[i]} `;
                }
            }
            user.nextTest = finalText;
        };
    }
}