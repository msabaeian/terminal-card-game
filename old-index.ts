import dotenv from "dotenv";
import { Socket, io } from "socket.io-client";
import { terminal as term, ScreenBuffer } from "terminal-kit";
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
let viewport = new ScreenBuffer({
    dst: term,
    width: Math.min(term.width),
    height: Math.min(term.height - 1),
    y: 2,
});
let screenHelper = {
    leftCenter: {
        x: 0,
        y: Math.round(viewport.height / 2),
    },
    rightCenter: {
        x: viewport.width,
        y: Math.round(viewport.height / 2),
    },
    topCenter: {
        x: Math.round(viewport.width / 2),
        y: 0,
    },
    bottomCenter: {
        x: Math.round(viewport.width / 2),
        y: viewport.height,
    },
};
let user_state: "rooms" | "create_room_wizard" | "in_room" = "rooms";
let socket: null | Socket = null;
let rooms = [];

const writeUserFile = () => {
    writeFile("mark-user.json", JSON.stringify(user), "utf8", (err) => {
        if (err) {
            term.red("Error writing to file:", err);
            terminate();
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

const terminate = () => {
    term.hideCursor(false);
    term.grabInput(false);
    process.exit();
};

const errorGaurd = (error: any) => {
    if (error) {
        terminate();
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
            terminate();
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
        terminate();
    });

    socket.on("connect_error", (error) => {
        term.red("can not connect\n");
        term.red(error);
        terminate();
    });
};

const drawPlayRoom = (turnPlayer = "Mahdihovei") => {
    term.saveCursor();
    clear();
    term.moveTo.eraseLine.green(1, 1, "Arrow keys: move the ship - Q/Ctrl-C: Quit");
    term.red("   - h for heart (del), d for diamond (khesht), s for spade(pik), c for club(geshniz)\n");
    // draw top line
    for (let i = 0; i <= viewport.width - 1; i++) {
        term("-");
    }

    // draw bottom line
    term.moveTo(0, viewport.height);
    for (let i = 0; i <= viewport.width - 1; i++) {
        term("-");
    }

    // draw vertical lines
    for (let i = 3; i <= viewport.height - 1; i++) {
        term.moveTo(0, i)("|");

        term.moveTo(viewport.width, i)("|");
    }

    // left player
    let LeftPlayer = "MSABA";
    const isLeftPlayerTurn = turnPlayer === LeftPlayer;
    if (isLeftPlayerTurn) {
        LeftPlayer = `*${LeftPlayer}*`;
    }
    let startYPosition = screenHelper.leftCenter.y - Math.round(LeftPlayer.length / 2);
    for (let i = 0; i <= LeftPlayer.length - 1; i++) {
        term.moveTo(2, startYPosition + i);
        if (isLeftPlayerTurn) {
            term.yellow(LeftPlayer[i]);
        } else {
            term.blue(LeftPlayer[i]);
        }
    }

    // right player
    let rightPlayer = "Alimoha";
    const isRightPlayerTurn = turnPlayer === rightPlayer;
    if (isRightPlayerTurn) {
        rightPlayer = `*${rightPlayer}*`;
    }
    for (let i = 0; i <= rightPlayer.length - 1; i++) {
        term.moveTo(viewport.width - 2, startYPosition + i);
        if (isRightPlayerTurn) {
            term.yellow(rightPlayer[i]);
        } else {
            term.blue(rightPlayer[i]);
        }
    }

    // top player
    let topPlayer = "Hoss";
    const isTopPlayerTurn = turnPlayer === topPlayer;
    if (isTopPlayerTurn) {
        topPlayer = `*${topPlayer}*`;
    }
    startYPosition = screenHelper.topCenter.x - Math.round(topPlayer.length / 2);
    for (let i = 0; i <= topPlayer.length - 1; i++) {
        term.moveTo(startYPosition + i, 3);
        if (isTopPlayerTurn) {
            term.yellow(topPlayer[i]);
        } else {
            term.blue(topPlayer[i]);
        }
    }

    // top player
    let bottomPlayer = "Mojibajim";
    const isBottomPlayerTurn = turnPlayer === bottomPlayer;
    if (isBottomPlayerTurn) {
        bottomPlayer = `*${bottomPlayer}*`;
    }
    for (let i = 0; i <= bottomPlayer.length - 1; i++) {
        term.moveTo(startYPosition + i, viewport.height - 1);
        if (isBottomPlayerTurn) {
            term.yellow(bottomPlayer[i]);
        } else {
            term.blue(bottomPlayer[i]);
        }
    }

    term.grabInput(true);
    term.restoreCursor();
};

function handleInputs(key) {
    switch (key) {
        case "UP":
            term.up(1);
            break;
        case "DOWN":
            term.down(1);
            break;
        case "LEFT":
            term.left(1);
            break;
        case "RIGHT":
            term.right(1);
            break;
        case "q":
            terminate();
            break;
        case "CTRL_C":
            terminate();
            break;
    }
}

const getRandomItemFromArray = <T>(array: T[]): T => {
    return array[Math.floor(Math.random() * array.length)];
};

const main = () => {
    clear();
    term.green("Welcome to very first version of Mark Dezfuli!\n");
    term.on("key", handleInputs);
    // readUserFile();

    drawPlayRoom(getRandomItemFromArray(["MSABA", "Alimoha", "Mojibajim", "Hoss"]));
};

main();
