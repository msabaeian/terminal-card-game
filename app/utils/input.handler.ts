import { terminal as term } from "terminal-kit";
import { terminateTerminal } from "./terminal";
import { Windows } from "./types";
import handleGameInputs from "@windows/game/input.handler";
import handleRoomsInputs from "@windows/rooms/input.handler";
import { userSelector } from "@store/user/selectors";

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
            handleGameInputs(key);
            break;
        case Windows.ROOMS:
            handleRoomsInputs(key);
            break;
        default:
            break;
    }
};

term.on("key", handleInputs);
