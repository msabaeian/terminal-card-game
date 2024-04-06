import { ScreenBuffer, terminal as term } from "terminal-kit";
import { safeString } from "@utils/string.utils";

let viewport = new ScreenBuffer({
    dst: term,
    width: term.width,
    height: term.height,
});

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

const input = (opt: {
    message: string;
    clearBeforeInput?: boolean;
    clearAfterResponse?: boolean;
    required?: boolean;
}) => {
    return new Promise<string>((resolve) => {
        const { message, clearAfterResponse = true, clearBeforeInput = true, required = false } = opt;

        if (clearBeforeInput) {
            clearTerminal();
        }

        term(message);
        term.inputField((error, response) => {
            errorGuard(error);
            if (clearAfterResponse) {
                clearTerminal();
            }
            if (required && !response) {
                return input(opt);
            } else {
                return resolve(response ? safeString(response) : "");
            }
        });
    });
};

export { clearTerminal, terminateTerminal, errorGuard, input, viewport };
