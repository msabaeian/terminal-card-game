import { terminal as term } from "terminal-kit";
import { terminateTerminal } from "./terminal";
import { userSelector } from "@store/selectors";
import { Windows } from "./types";
import handleRoomInputs from "@windows/room/input.handler";
import handleRoomsInputs from "@windows/rooms/input.handler";

const handleInputs = (key) => {
    switch (key) {
        case "q":
            terminateTerminal();
            break;
        case "CTRL_C":
            terminateTerminal();
            break;
        default:
            break;
    }

    const { activeWindow } = userSelector();
    switch (activeWindow) {
        case Windows.ROOM:
            handleRoomInputs(key);
            break;
        case Windows.ROOMS:
            handleRoomsInputs(key);
            break;
        default:
            break;
    }
};

term.on("key", handleInputs);
