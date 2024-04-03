import store from "@store/store";
import { Windows } from "./types";
import { setActiveWindow } from "@store/userSlice";
import initWindow from "@windows/init";
import { clearTerminal } from "./terminal";
import { terminal as term } from "terminal-kit";

const navigate = (value: Windows) => {
    clearTerminal();
    store.dispatch(setActiveWindow(value));
    switch (value) {
        case Windows.INIT:
            initWindow();

        case Windows.AUTH:
            term.red("not defined yet\n");

        case Windows.LOBBY:
            term.red("not defined yet\n");

        case Windows.GAME:
            term.red("not defined yet\n");

        default:
            term.red("not defined yet\n");
    }
};

export { navigate };
