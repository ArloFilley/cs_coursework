use rocket::serde::{
    json::{from_str, to_string, Json},
    Deserialize, Serialize,
};

use std::{
    fs::{read_dir, File},
    io::{Read, Write},
};

#[derive(Deserialize, Serialize, Clone, Debug)]
#[serde(crate = "rocket::serde")]
struct Process {
    name: String,
    memory: String,
    run_time: String,
    id: String,
    user_id: String,
    virtual_memory: String,
}

#[derive(Deserialize, Serialize, Clone, Debug)]
#[serde(crate = "rocket::serde")]
struct Disk {
    name: String,
    disk_type: String,
    total_space: String,
    available_space: String,
    usage: String,
    file_system: String,
}

#[derive(Deserialize, Serialize, Clone, Debug)]
#[serde(crate = "rocket::serde")]
struct CPU {
    core_count: String,
    cache: String,
    clock_speed: String,
}

#[derive(Deserialize, Serialize)]
#[serde(crate = "rocket::serde")]
pub struct System {
    key: String,
    host_name: String,
    uptime: String,
    os: String,
    total_ram: String,
    used_ram: String,
    available_ram: String,
    ram_usage: String,
    total_swap: String,
    used_swap: String,
    available_swap: String,
    swap_usage: String,
    disks: Vec<Disk>,
    processes: Vec<Process>,
    cpu: CPU,
}

#[post("/servers", data = "<data>")]
pub fn server(data: Json<System>) {
    if data.key == "0etnmXPSr95@FNy6A3U9Bw*ZupNIR85zI!hRFGIdj6SW$T" {
        println!("Data From : {}", data.host_name);
    }

    let mut file = match File::create(format!("./server/{}.json", &data.host_name)) {
        Err(why) => {
            println!("Error: {why}");
            return;
        }
        Ok(file) => file,
    };

    let data: System = System {
        key: format!("null"),
        host_name: format!("{}", data.host_name),
        uptime: format!("{}", data.uptime),
        os: format!("{}", data.os),
        total_ram: format!("{}", data.total_ram),
        used_ram: format!("{}", data.used_ram),
        available_ram: format!("{}", data.available_ram),
        ram_usage: format!("{}", data.ram_usage),
        total_swap: format!("{}", data.total_swap),
        used_swap: format!("{}", data.used_swap),
        available_swap: format!("{}", data.available_swap),
        swap_usage: format!("{}", data.swap_usage),
        disks: data.disks.clone(),
        processes: data.processes.clone(),
        cpu: data.cpu.clone(),
    };

    let string = match to_string(&data) {
        Err(why) => {
            println!("Error: {why}");
            return;
        }
        Ok(string) => string,
    };

    let write = file.write_all(string.as_bytes());

    match write {
        Err(why) => println!("Error {why}"),
        Ok(_) => (),
    }
}

#[get("/server_info")]
pub fn server_info() -> Json<Vec<System>> {
    let mut systems: Vec<System> = vec![];
    let folder = match read_dir("./server/") {
        Err(why) => {
            println!("Error: {why}");
            read_dir("./server/").unwrap()
        }
        Ok(dir) => dir,
    };
    let mut file: File;
    let mut string;

    for path in folder {
        string = String::new();
        let path = match path {
            Err(ref why) => {
                println!("Error: {why}");
                path.unwrap()
            }
            Ok(path) => path,
        }
        .path();

        file = match File::open(format!("{}", path.display())) {
            Err(why) => {
                println!("Error: {why}");
                File::open(format!("{}", path.display())).unwrap()
            }
            Ok(file) => file,
        };

        match file.read_to_string(&mut string) {
            Err(why) => println!("Error: {why}"),
            Ok(_) => (),
        };

        match from_str(&string) {
            Err(why) => println!("Error: {why}"),
            Ok(string) => systems.push(string),
        };
    }

    Json(systems)
}
