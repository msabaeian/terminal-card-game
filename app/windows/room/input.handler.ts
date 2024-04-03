import { terminal as term } from "terminal-kit";
import { terminateTerminal } from "@utils/terminal";

const handleRoomInputs = (key) => {
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
            terminateTerminal();
            break;
        case "CTRL_C":
            terminateTerminal();
            break;
    }
};

export default handleRoomInputs;
