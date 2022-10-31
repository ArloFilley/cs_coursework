class API {
    
    constructor() {
        this.url = "http://82.14.241.42:8000/api/";
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
    postTest(pUserNickname, pTestType, pTestLength, pTestTime, pTestSeed, pQuoteId, pWpm, pAccuracy, pUserId) {
        const data = {
            'user_nickname': pUserNickname,
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
        xhr.open("POST", this.url+"post_test");
        xhr.send(JSON.stringify(data));
    }

    /**
     * Validates all the parameters used for the postTest function which it then calls
     */
    validateTest() {
        const test = screenManager.textbox.getLetters();
        const testType = "words";
        let testLength = test.length;
        let testTime = screenManager.timer.getTime();
        const testSeed = 0;
        const quoteId = 0;
        let wpm;
        const accuracy = 0;
        const userId = 0;
        let name = screenManager.name;
        let test_content = screenManager.textbox.testContent;

        // this is the wpm calculation factoring in the time of test
        // it assumes that all words are 5 characters long because on average
        // they are

        let string = "";
        for (let letter = 0; letter < test.length; letter++) {
            if (test[letter] == test_content[letter]) {
                string += test[letter];
            }
        }

        wpm = Math.round((string.length / 5) * (60 / testTime));

        let stringName = "";
        for (let letter = 0; letter < name.length; letter++) {
            stringName += name[letter];
        }

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

        this.postTest(stringName, testType, testLength, testTime, testSeed, quoteId, wpm, accuracy, userId);
    }
}