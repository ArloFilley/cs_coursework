
get();
let disks = false;
let processes = false;
let sysinfo = true;
let allSysInfo = false;
let cpu = false;
let json;
let server = 0;

setInterval(get, 5000);
function get() {
    let xhr = new XMLHttpRequest();
    xhr.open('GET', 'https://arlofilley.com/api/server_info');
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.responseType = 'json';
    xhr.send();
    xhr.onload = () => {
        json = xhr.response
        createElements(json);
        createButtons(json);
    };
};

function reset_tables() {
    disks = false;
    processes = false;
    sysinfo = false;
    allSysInfo = false;
    cpu = false;
}

function createElements(pJson) {
    let title = document.getElementById(`system`);
    title.textContent = pJson[server].host_name;
    document.title = pJson[server].host_name;

    createAllSystemInfo(pJson);
    createProcesses(pJson[server]);
    createDisks(pJson[server]);
    createSystemInfo(pJson[server]);
    create_cpu_table(pJson[server], cpu);
};

function createAllSystemInfo(systems) {
    let div = document.getElementById(`allSystemInfo`)

    
    while (div.firstChild) {
        div.removeChild(div.firstChild)
    }

    if (!allSysInfo) return;

    document.title = "All Systems"
    let title = document.getElementById('system');
    title.textContent = "All Systems"
    
    let table = document.createElement(`table`);
    let tableBody = document.createElement(`tbody`);
    table.appendChild(tableBody);
    let tr = document.createElement(`tr`);
    tableBody.appendChild(tr)

    create_table_element(
        tr,
        "",
        ["Name", "OS", "Uptime", "Total Ram", "Used Ram",
         "Available Ram", "Ram Usage", "Total Swap", "Used Swap", 
         "Available Swap", "Swap Usage"]
    );

    tableBody.appendChild(tr);
    tr = document.createElement(`tr`);

    for (let i = 0; i < systems.length; i++) {
        let system = systems[i];
        create_table_element(
            tr,
            "",
            [`${system.host_name}`, `${system.os}`, `${system.uptime}`, `${system.total_ram}`,
             `${system.used_ram}`, `${system.available_ram}`, `${system.ram_usage}%`, `${system.total_swap}`,
             `${system.used_swap}`, `${system.available_swap}`, `${system.swap_usage}%`]  
        )
        tableBody.appendChild(tr);
        tr = document.createElement(`tr`);
    }
    div.appendChild(table);
}


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

    create_table_element(
        tr,
        "",
        ["Name", "OS", "Uptime", "Total Ram", "Used Ram",
         "Available Ram", "Ram Usage", "Total Swap", "Used Swap", 
         "Available Swap", "Swap Usage"]
    );
    tableBody.appendChild(tr);
    tr = document.createElement('tr');

    create_table_element(
        tr,
        "",
        [`${pJson.host_name}`, `${pJson.os}`, `${pJson.uptime}`, `${pJson.total_ram}`,
         `${pJson.used_ram}`, `${pJson.available_ram}`, `${pJson.ram_usage}%`, `${pJson.total_swap}`,
         `${pJson.used_swap}`, `${pJson.available_swap}`, `${pJson.swap_usage}%`]  
    );
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

    create_table_element(
        tr,
        "",
        ["Name", "Memory", "Run Time", "Process ID",
         "User ID", "Virtual Memory"]
    );

    tableBody.appendChild(tr);
    tr = document.createElement('tr');
  
    for (let i = 0; i < pJson.processes.length; i++) {
        let process = pJson.processes[i];
        create_table_element(
            tr,
            "",
            [`${process.name}`, `${process.memory}`, `${process.run_time}`, `${process.id}`,
             `${process.user_id}`, `${process.virtual_memory}`]
        )

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


    create_table_element(
        tr, 
        "",
        ["Name", "Type", "Total Space", "Available Space", 
         "Usage","File System"]
    );
    
    tableBody.appendChild(tr);
    tr = document.createElement('tr');
  
    for (let i = 0; i < pJson.disks.length; i++) {
        let disk = pJson.disks[i];
        create_table_element(
            tr,
            "",
            [`${disk.name}`, `${disk.disk_type}`, `${disk.total_space}`,
             `${disk.available_space}`, `${disk.usage}%`, `${disk.file_system}`]
        )
        tableBody.appendChild(tr);
        tr = document.createElement('tr');
    }
    div.appendChild(table);
};

function create_table_element(tr, string, elements) {
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
}

b = document.getElementById("Processes Header");
b.addEventListener("click", () => {
    reset_tables();
    processes = true;
    createElements(json);
});

c = document.getElementById("systeminfo");
c.addEventListener("click", () => {
    reset_tables();
    sysinfo = true;
    createElements(json);
});
 let button = document.getElementById

e = document.getElementById("Disks Header");
e.addEventListener("click", () => {
    reset_tables();
    disks = true;
    createElements(json);
});

f = document.getElementById("allSystemsButton");
f.addEventListener("click", () => {
    reset_tables();
    allSysInfo = true;
    createElements(json);
})

function createButtons(pJson) {
    let div = document.getElementById("systems");

    while (div.firstChild) {
        div.removeChild(div.firstChild)
    }

    for (let i = 0; i < pJson.length; i++) {
        let system = pJson[i];

        let button = document.createElement("button");
        button.textContent = system.host_name;
        button.id = i;
        button.addEventListener("click", () => {
            reset_tables();
            sysinfo = true;
            server = button.id
            createElements(json);
        });
        div.appendChild(button);
    }
}
