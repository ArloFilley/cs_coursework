get();
let disks = false;
let processes = false;
let sysinfo = true;
let json;
let server = 0;

setInterval(get, 5000);
function get() {
    let xhr = new XMLHttpRequest();
    xhr.open('GET', 'http://arlofilley.com/api/server_info');
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.responseType = 'json';
    xhr.send();
    xhr.onload = () => {
        json = xhr.response
        createElements(json[server]);
        createButtons(json);
    };
};

function createElements(pJson) {
    let title = document.getElementById(`system`);
    title.textContent = pJson.host_name;
    document.title = pJson.host_name;

    createProcesses(pJson);
    createDisks(pJson);
    createSystemInfo(pJson);
};

function createSystemInfo(pJson) {
    let div = document.getElementById(`systemInfo`);
    
    while (div.firstChild) {
        div.removeChild(div.firstChild)
    }

    if (!sysinfo) return;

    let table = document.createElement(`table`);

    let tableBody = document.createElement('tbody');
    table.appendChild(tableBody);
    let tr = document.createElement('tr');
    tableBody.appendChild(tr);

    let td = document.createElement('td');
    td.appendChild(document.createTextNode(`Name`));
    tr.appendChild(td);
    td = document.createElement('td');
    td.appendChild(document.createTextNode(`OS`));
    tr.appendChild(td);
    td = document.createElement('td');
    td.appendChild(document.createTextNode(`Uptime`));
    tr.appendChild(td);
    td = document.createElement('td');
    td.appendChild(document.createTextNode(`Total Ram`));
    tr.appendChild(td);
    td = document.createElement('td');
    td.appendChild(document.createTextNode(`Used Ram`));
    tr.appendChild(td);
    td = document.createElement('td');
    td.appendChild(document.createTextNode(`Available Ram`));
    tr.appendChild(td);
    td = document.createElement('td');
    td.appendChild(document.createTextNode(`Total Swap`));
    tr.appendChild(td);
    tableBody.appendChild(tr);
    td = document.createElement('td');
    td.appendChild(document.createTextNode(`Used Swap`));
    tr.appendChild(td);
    tableBody.appendChild(tr);
    td = document.createElement('td');
    td.appendChild(document.createTextNode(`Available Swap`));
    tr.appendChild(td);
    tableBody.appendChild(tr);
    tr = document.createElement('tr');

    td = document.createElement('td');
    td.appendChild(document.createTextNode(pJson.host_name));
    tr.appendChild(td);
    td = document.createElement('td');
    td.appendChild(document.createTextNode(pJson.os));
    tr.appendChild(td);
    td = document.createElement('td');
    td.appendChild(document.createTextNode(pJson.uptime));
    tr.appendChild(td);
    td = document.createElement('td');
    td.appendChild(document.createTextNode(pJson.total_ram));
    tr.appendChild(td);
    td = document.createElement('td');
    td.appendChild(document.createTextNode(pJson.used_ram));
    tr.appendChild(td);
    td = document.createElement('td');
    td.appendChild(document.createTextNode(pJson.available_ram));
    tr.appendChild(td);
    td = document.createElement('td');
    td.appendChild(document.createTextNode(pJson.total_swap));
    tr.appendChild(td);
    td = document.createElement('td');
    td.appendChild(document.createTextNode(pJson.used_swap));
    tr.appendChild(td);
    td = document.createElement('td');
    td.appendChild(document.createTextNode(pJson.available_swap));
    tr.appendChild(td);
    tableBody.appendChild(tr);
    tr = document.createElement('tr');
  
    div.appendChild(table);
};

function createProcesses(pJson) {
    let div = document.getElementById(`processes`);
    
    while (div.firstChild) {
        div.removeChild(div.firstChild)
    }

    if (!processes) return;

    let table = document.createElement(`table`);

    let tableBody = document.createElement('tbody');
    table.appendChild(tableBody);
    let tr = document.createElement('tr');
    tableBody.appendChild(tr);

    let td = document.createElement('td');
    td.appendChild(document.createTextNode(`Name`));
    tr.appendChild(td);
    td = document.createElement('td');
    td.appendChild(document.createTextNode(`Memory`));
    tr.appendChild(td);
    td = document.createElement('td');
    td.appendChild(document.createTextNode(`Run Time`));
    tr.appendChild(td);
    td = document.createElement('td');
    td.appendChild(document.createTextNode(`Process ID`));
    tr.appendChild(td);
    td = document.createElement('td');
    td.appendChild(document.createTextNode(`User ID`));
    tr.appendChild(td);
    td = document.createElement('td');
    td.appendChild(document.createTextNode(`Virtual Memory`));
    tr.appendChild(td);
    tableBody.appendChild(tr);
    tr = document.createElement('tr');
  
    for (let i = 0; i < pJson.processes.length; i++) {
        td = document.createElement('td');
        td.appendChild(document.createTextNode(`${pJson.processes[i].name}`));
        tr.appendChild(td);

        td = document.createElement('td');
        td.appendChild(document.createTextNode(`${pJson.processes[i].memory}`));
        tr.appendChild(td);

        td = document.createElement('td');
        td.appendChild(document.createTextNode(`${pJson.processes[i].run_time}`));
        tr.appendChild(td);

        td = document.createElement('td');
        td.appendChild(document.createTextNode(`${pJson.processes[i].id}`));
        tr.appendChild(td);

        td = document.createElement('td');
        td.appendChild(document.createTextNode(`${pJson.processes[i].user_id}`));
        tr.appendChild(td);

        td = document.createElement('td');
        td.appendChild(document.createTextNode(`${pJson.processes[i].virtual_memory}`));
        tr.appendChild(td);

        tableBody.appendChild(tr);
        tr = document.createElement('tr');
    }
    div.appendChild(table);
};

function createDisks(pJson) {
    let div = document.getElementById(`disks`);
    
    while (div.firstChild) {
        div.removeChild(div.firstChild)
    }

    if (!disks) return;

    let table = document.createElement(`table`);

    let tableBody = document.createElement('tbody');
    table.appendChild(tableBody);
    let tr = document.createElement('tr');
    tableBody.appendChild(tr);

    let td = document.createElement('td');
    td.appendChild(document.createTextNode(`Name`));
    tr.appendChild(td);
    td = document.createElement('td');
    td.appendChild(document.createTextNode(`Type`));
    tr.appendChild(td);
    td = document.createElement('td');
    td.appendChild(document.createTextNode(`Total Space`));
    tr.appendChild(td);
    td = document.createElement('td');
    td.appendChild(document.createTextNode(`Available Space`));
    tr.appendChild(td);
    td = document.createElement('td');
    td.appendChild(document.createTextNode(`Usage`));
    tr.appendChild(td);
    td = document.createElement('td');
    td.appendChild(document.createTextNode(`File System`));
    tr.appendChild(td);
    tableBody.appendChild(tr);
    tr = document.createElement('tr');
  
    for (let i = 0; i < pJson.disks.length; i++) {
        td = document.createElement('td');
        td.appendChild(document.createTextNode(`${pJson.disks[i].name}`));
        tr.appendChild(td);

        td = document.createElement('td');
        td.appendChild(document.createTextNode(`${pJson.disks[i].disk_type}`));
        tr.appendChild(td);

        td = document.createElement('td');
        td.appendChild(document.createTextNode(`${pJson.disks[i].total_space}`));
        tr.appendChild(td);

        td = document.createElement('td');
        td.appendChild(document.createTextNode(`${pJson.disks[i].available_space}`));
        tr.appendChild(td);

        td = document.createElement('td');
        td.appendChild(document.createTextNode(`${pJson.disks[i].usage}`));
        tr.appendChild(td);

        td = document.createElement('td');
        td.appendChild(document.createTextNode(`${pJson.disks[i].file_system}`));
        tr.appendChild(td);

        tableBody.appendChild(tr);
        tr = document.createElement('tr');
    }
    div.appendChild(table);
};

b = document.getElementById("Processes Header");
b.addEventListener("click", () => {
    processes = true;
    disks = false;
    sysinfo = false;
    createElements(json[server]);
});

c = document.getElementById("systeminfo");
c.addEventListener("click", () => {
    processes = false;
    disks = false;
    sysinfo = true;
    createElements(json[server]);
});
 let button = document.getElementById

e = document.getElementById("Disks Header");
e.addEventListener("click", () => {
    disks = true;
    processes = false;
    sysinfo  = false;
    createElements(json[server]);
});

function createButtons(pJson) {
    let div = document.getElementById("systems");

    while (div.firstChild) {
        div.removeChild(div.firstChild)
    }

    for (let i = 0; i < pJson.length; i++) {
        let system = pJson[i];

        let button = document.createElement("button");
        button.textContent = system.host_name.toUpperCase();
        button.id = i;
        button.addEventListener("click", () => {
            disks = false;
            processes = false;
            sysinfo = true;
            server = button.id
            createElements(json[button.id]);
        });
        div.appendChild(button);
    }
}
