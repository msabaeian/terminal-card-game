import dotenv from "dotenv";
import { Socket, io } from "socket.io-client";
import { terminal as term } from "terminal-kit";
import { writeFile, readFile } from "node:fs";
import { v4 as uuidv4 } from "uuid";

dotenv.config();
let user = {
    username: "",
    user_id: "",
};
let roomData = {
    room_id: "",
    room_name: "",
};
let user_state: "rooms" | "create_room_wizard" | "in_room" = "rooms";
let socket: null | Socket = null;
let rooms = [];

term.on("key", (name, matches, data) => {
    if (name === "CTRL_C") {
        process.exit();
    }
});

const writeUserFile = () => {
    writeFile("mark-user.json", JSON.stringify(user), "utf8", (err) => {
        if (err) {
            term.red("Error writing to file:", err);
            process.exit();
        }
    });
};

const readUserFile = () => {
    readFile("mark-user.json", "utf8", (err, data) => {
        if (err) {
            return askUsername();
        }

        const userFileData = JSON.parse(data);
        if (userFileData.username && userFileData.user_id) {
            confirmUsageOfPreviousUser(userFileData.username, userFileData.user_id);
        } else {
            askUsername();
        }
    });
};

const safeString = (value: string): string => {
    return value.replace(/[^a-zA-Z0-9]/g, "");
};

const clear = () => {
    term.clear();
};

const errorGaurd = (error: any) => {
    if (error) {
        process.exit();
    }
};

const askUsername = () => {
    term("Enter your username: ");
    term.inputField((error, input) => {
        errorGaurd(error);

        clear();
        user.username = safeString(input!);
        user.user_id = uuidv4();
        writeUserFile();
        term.green("Excellent!!\n");
        term("From now your username is '%s' and key is '%s', don't forget to write it down to use in other computers\n", user.username, user.user_id);
        redirectToMain();
    });
};

const confirmUsageOfPreviousUser = (username: string, user_id: string) => {
    term.yellow("I found username '%s' with '%s' as id, do you want to login with these credentials? [y|n]\n", username, user_id);
    term.yesOrNo({ yes: ["y", "ENTER"], no: ["n"] }, (error, result) => {
        errorGaurd(error);
        if (result) {
            user.username = username;
            user.user_id = user_id;
            redirectToMain();
        } else {
            askUsername();
        }
    });
};

const redirectToMain = () => {
    return connectToSocket();
    // term("you will be redirect to main page in: ");
    // let i = 5;
    // const interval = setInterval(() => {
    //     if (i > 0) {
    //         term(i, ".");
    //         i--;
    //     } else {
    //         connectToSocket();
    //         clearInterval(interval);
    //     }
    // }, 1000);
};

const createRoomWizard = () => {
    user_state = "create_room_wizard";
    term("Enter your room name or type q for back: ");
    term.inputField((error, input) => {
        errorGaurd(error);
        clear();

        if (input === "q") {
            return printRooms();
        }

        socket!.emit("user:create_room", input);
    });
};

const printRooms = () => {
    user_state = "rooms";
    let items: string[] = [...rooms];
    items.push("Create Room");
    items.push("Exit Game");

    term.singleColumnMenu(items, (error, response) => {
        errorGaurd(error);
        clear();

        if (response.selectedIndex === items.length - 1) {
            process.exit();
        }

        if (response.selectedIndex === items.length - 2) {
            createRoomWizard();
        }
    });
};

const connectToSocket = () => {
    clear();
    term.yellow("Start connecting to the server\n");

    socket = io(process.env.SERVER_URL!, {
        auth: {
            user_id: user.user_id,
            username: user.username,
        },
    });

    socket.on("connect", () => {
        term.green("Connection has been established, loading\n");
    });

    socket.on("rooms", (roomsFromServer: []) => {
        if (user_state === "rooms") {
            clear();
            if (!roomsFromServer.length) {
                rooms = [];
                term.red("No room available.");
            }

            printRooms();
        }
    });

    socket.on("disconnect", (reason) => {
        term.red("Socket has been disconnected\n", reason);
        process.exit();
    });

    socket.on("connect_error", (error) => {
        term.red("can not connect\n");
        term.red(error);
        process.exit();
    });
};

const main = () => {
    clear();
    term.green("Welcome to very first version of Mark Dezfuli!\n");
    readUserFile();
};

main();
