get();
function get() {
    let xhr = new XMLHttpRequest();
    xhr.open('GET', 'http://127.0.0.1:8000/leaderboard');
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.responseType = 'json';
    xhr.send();
    xhr.onload = () => {
        createElements(xhr.response);
    };
}

function createElements(pJson) {
    console.log(pJson.length);
    for (let i = 0; i < pJson.length; i++) {
        console.log(i);
        let li = document.createElement('LI');
        let text = document.createTextNode(`${pJson[i].user_nickname} - ${pJson[i].wpm}`);
        li.appendChild(text);
        document.getElementById(`list`).appendChild(li);
    }
}