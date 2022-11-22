class API {
    
    constructor() {
        this.url = "http://arlofilley.com/api/";
        // this is the url of the server
        // this may have to change later on
    }

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
    postTest(
        pTestType, 
        pTestLength, 
        pTestTime, 
        pTestSeed, 
        pQuoteId, 
        pWpm, 
        pAccuracy, 
        pUserId
    ) {
        const data = {
            'test_type': pTestType,
            'test_length': pTestLength,
            'test_time': pTestTime,
            'test_seed': pTestSeed,
            'quote_id': pQuoteId,
            'wpm': pWpm,
            'accuracy': pAccuracy,
            'user_id': pUserId
        }

        const xhr = new XMLHttpRequest();
        xhr.open(
            "POST", 
            this.url+"post_test"
        );

        xhr.send(
            JSON.stringify(data)
        );
    }

    /**
     * Validates all the parameters used for the postTest function which it then calls
     */
    validateTest() {
        const test = screenManager.screen.textbox.getLetters();
        const testType = "words";
        let testLength = test.length;
        let testTime = screenManager.timer.getTime();
        const testSeed = 0;
        const quoteId = 0;
        let wpm;
        const accuracy = 0;
        const userId = Number(user.userId);
        let test_content = screenManager.screen.textbox.testContent;

        let string = "";
        for (let letter = 0; letter < test.length; letter++) {
            if (test[letter] === test_content[letter]) {
                string += test[letter];
            }
        }

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

        this.postTest(
            testType, 
            testLength, 
            testTime, 
            testSeed, 
            quoteId, 
            wpm, 
            accuracy, 
            userId
        );
    }

    /**
     * takes a validated name and password and sends
     * a post request to make a user with the given
     * username and password
     * @param {String} username 
     * @param {String} password 
     * @returns
     */
    createUser(
        username,
        password
    ) {
        console.log(username, password);
        const user = {
            username: username,
            password: password
        };

        const xhr = new XMLHttpRequest(); 
        xhr.open(
            "POST",
            `${this.url}create_user/`
        );

        xhr.send(
            JSON.stringify(user)
        );

        xhr.onload = () => {
            this.login(username,password);
        };
    }

    login(pUsername, pPassword) {
        if (localStorage.userId === null || localStorage.userId === 0 || localStorage.userId === undefined) {
            let xhr = new XMLHttpRequest();
                xhr.open('GET', `${this.url}login/${pUsername}/${pPassword}`);
                xhr.send();
                xhr.onload = () => {
                    user.userId = Number(xhr.response);
                    if (user.userId > 0) {
                        user.username = pUsername
                        localStorage.setItem("userId", user.userId);
                        localStorage.setItem("username", pUsername);
                        localStorage.setItem("password", pPassword);
                    } else {
                        user.username = "no one";
                        user.password = "none";
                        user.userId = 0;
                        user.tests = [];
                    } 
                };
        } else if (localStorage.userId > 0) {
            user.userId = localStorage.userId;
            user.username = localStorage.username;
            user.password = localStorage.password;
        }
    }

    logout() {
        user = new User();
        user.username = "no one";
        user.password = "none";
        user.userId = 0;
        user.tests = [];
        localStorage.clear();
    }

    getUserTests() {
        let xhr = new XMLHttpRequest();
        let userId = Number(user.userId);
        xhr.open('GET', `${this.url}get_user_tests/${userId}/`);
        xhr.send();
        xhr.onload = () => {
            user.tests = JSON.parse(xhr.response);
        };
    }

    getLeaderBoard() {
        let xhr = new XMLHttpRequest();
        xhr.open('GET', `${this.url}leaderboard/`);
        xhr.send();
        xhr.onload = () => {
            user.leaderboard = JSON.parse(xhr.response);
        };
    }

    getTest() {
        let xhr = new XMLHttpRequest();
        xhr.open('GET', `https://random-word-api.herokuapp.com/word?number=100`);
        xhr.send();
        xhr.onload = () => {
            let textArr = JSON.parse(xhr.response);
            let text = "";
            for (let i = 0; i < textArr.length; i++) {
                text += `${textArr[i]} `
            }
            user.nextTest = text;
        };
    }
}