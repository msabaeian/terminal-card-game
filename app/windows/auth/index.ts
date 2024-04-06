import store from "@store/store";
import { setUser } from "@store/user/userSlice";
import { navigate } from "@utils/navigation";
import { generateUUID } from "@utils/string.utils";
import { errorGuard, input } from "@utils/terminal";
import { Windows } from "@utils/types";
import { readFile, writeFile } from "node:fs";
import { terminal as term } from "terminal-kit";
import { userSelector } from "@store/user/selectors";

const authWindow = () => {
    navigate(Windows.ROOM);
    // term.green("Welcome to very first version of Mark Dezfuli!\n");
    // readUserFile();
    // dispatch(setRooms(ROOMS_MOCK));
};

const confirmUsageOfPreviousUser = () => {
    const { username } = userSelector();
    term.yellow("Found username '%s' do you want to login with this? [y|n]\n", username);
    term.yesOrNo({ yes: ["y", "ENTER"], no: ["n"] }, (error, result) => {
        errorGuard(error);
        if (result) {
            navigate(Windows.ROOMS);
        } else {
            askUsername();
        }
    });
};

const askUsername = async () => {
    const username = await input({
        message: "Enter your username: ",
        required: true,
    });

    store.dispatch(
        setUser({
            user_id: generateUUID(),
            username: username,
        }),
    );
    writeUserFile();
    term.green("Excellent!!\n");
    term("From now your username is '%s'\n", username);
    navigate(Windows.ROOMS);
};

const writeUserFile = () => {
    const { user_id, username } = userSelector();
    writeFile("mark-user.json", JSON.stringify({ user_id, username }), "utf8", (err) => {
        errorGuard(err);
    });
};

const readUserFile = () => {
    readFile("mark-user.json", "utf8", (err, data) => {
        if (err) {
            return askUsername();
        }

        const userFileData = JSON.parse(data);
        if (userFileData.username && userFileData.user_id) {
            store.dispatch(
                setUser({
                    user_id: userFileData.user_id,
                    username: userFileData.username,
                }),
            );
            confirmUsageOfPreviousUser();
        } else {
            askUsername();
        }
    });
};

export default authWindow;
