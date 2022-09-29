const url = "http://localhost:8000/api/post_test/"
const data = {
    test_type: "words",
    test_length: 500,
    test_time: 100,
    test_seed: 123040004,
    quote_id: 0,
    wpm: 60,
    accuracy: 100,
}
const xhr = new XMLHttpRequest();
const button = document.getElementById("button");

button.addEventListener("click", (e) => {
    send();
});

function send() {
    xhr.open("POST", url);
    xhr.send(JSON.stringify(data));
}