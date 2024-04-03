import { terminal as term } from "terminal-kit";

const clearTerminal = () => {
    term.clear();
};

const terminateTerminal = () => {
    term.hideCursor(false);
    term.grabInput(false);
    process.exit();
};

export { clearTerminal, terminateTerminal };
