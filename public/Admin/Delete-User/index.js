get();

function get() {
    let xhr = new XMLHttpRequest();
    xhr.open('GET', `https://arlofilley.com/api/typing/leaderboard`);
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.responseType = 'json';
    xhr.send();
    xhr.onload = () => {
        json = xhr.response
        createTable(json);
    };
}

function createTable(pJson) {
    
    let table = document.getElementById("table");
    console.log(password)

    pJson.forEach(element => {
        let tr = document.createElement('tr');
        let button = document.createElement('button');
        let username = element.username;
        button.textContent = "delete"
        button.addEventListener( "click", () => {
            let xhr = new XMLHttpRequest();
            let password = document.getElementById("password").value;
            xhr.open('GET', `https://arlofilley.com/api/typing/delete_user/${password}/${username}/120932187`);
            xhr.send();
        })

        create_table_element(tr, "", [element.username, element.wpm], button)
        table.appendChild(tr)
    });
    
}

function create_table_element(tr, string, elements, button) {
    if (elements.length > 0) {
        for (let i = 0; i < elements.length; i++) {
            let td = document.createElement('td');
            td.appendChild(document.createTextNode(elements[i]));
            tr.appendChild(td);
        }
    } else {
        let td = document.createElement('td');
        td.appendChild(document.createTextNode(string));
        tr.appendChild(td);
    }
    tr.appendChild(button);
}