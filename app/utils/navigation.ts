import store from "@store/store";
import { Windows } from "./types";
import { setActiveWindow } from "@store/user/userSlice";
import { clearTerminal } from "./terminal";
import { terminal as term } from "terminal-kit";
import authWindow from "@windows/auth";
import roomsWindow from "@windows/rooms";

const navigate = (value: Windows) => {
    clearTerminal();
    store.dispatch(setActiveWindow(value));
    switch (value) {
        case Windows.AUTH:
            authWindow();
            break;
        case Windows.ROOMS:
            roomsWindow();
            break;
        default:
            term.red(`window ${Windows[value]} has not been defined yet\n`);
    }
};

export { navigate };
