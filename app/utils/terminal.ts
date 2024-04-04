import { terminal as term } from "terminal-kit";

const clearTerminal = () => {
    term.clear();
};

const terminateTerminal = () => {
    term.hideCursor(false);
    term.grabInput(false);
    process.exit();
};

const errorGuard = (error: any) => {
    if (error) {
        term.red(`${error}\n`);
        terminateTerminal();
    }
};

export { clearTerminal, terminateTerminal, errorGuard };
