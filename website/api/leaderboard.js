get();
setInterval(get, 5000);
function get() {
    let xhr = new XMLHttpRequest();
    xhr.open('GET', 'http://arlofilley.com/leaderboard');
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.responseType = 'json';
    xhr.send();
    xhr.onload = () => {
        createElements(xhr.response);
    };
}

function createElements(pJson) {
    let list = document.getElementById(`list`);
    while (list.firstChild) {
        list.removeChild(list.firstChild)
    }

    console.log(pJson.length);
    for (let i = 0; i < pJson.length; i++) {
        let li = document.createElement('LI');
        let text = document.createTextNode(`${pJson[i].user_nickname} | ${pJson[i].wpm} wpm`);
        li.appendChild(text);
        list.appendChild(li);
    }
}