import { navigate } from "@utils/navigation";
import { clearTerminal, errorGaurd } from "@utils/terminal";
import { Windows } from "@utils/types";
import { terminal as term } from "terminal-kit";

const roomsWindow = () => {
    term.yellow("Up/Down: navigate, Enter: open a room, C: create a room, Q/CRTL+C: exit game\n");
    let items = [
        {
            value: 1,
            key: "Mashte Hossein [2/4]",
        },
        {
            value: 2,
            key: "Ansari gangzzz [3/4]",
        },
        {
            value: 3,
            key: "Delroba [1/4]",
        },
        {
            value: -1,
            key: "Create Room",
        },
    ];

    term.singleColumnMenu(
        items.map((item) => item.key),
        (error, response) => {
            errorGaurd(error);
            const selectedOption = items[response.selectedIndex];

            if (selectedOption.value === -1) {
                clearTerminal();
                roomsWindow();
                // return create room
            }

            openRoom(selectedOption.key);
        },
    );
};

const openRoom = async (name: string) => {
    clearTerminal();
    const loading = await term.spinner();
    term.hideCursor();
    term(` Opening room ${name}`);

    // socket with ack, open room
    setTimeout(() => {
        term.hideCursor(false);
        loading.animate(false);
        clearTerminal();
        navigate(Windows.ROOMS);
    }, 2000);
};

export default roomsWindow;
