import { terminal as term } from "terminal-kit";
import { navigate } from "@utils/navigation";
import { Windows } from "@utils/types";
import { safeString } from "@utils/string.utils";

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

const input = (opt: { message: string; clearBeforeInput?: boolean; clearAfterResponse?: boolean; required?: boolean }) => {
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

export { clearTerminal, terminateTerminal, errorGuard, input };
