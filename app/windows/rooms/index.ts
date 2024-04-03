import { clearTerminal, errorGaurd } from "@utils/terminal";
import { Player, Room } from "@utils/types";
import { terminal as term } from "terminal-kit";
import { dispatch } from "@store/store";
import { setRooms, setSelectedRoom } from "@store/roomsSlice";
import { ROOMS_MOCK } from "@windows/rooms/mocks";
import { roomsSelector } from "@store/selectors";

const roomsWindow = () => {
    // TODO: replace with socket
    dispatch(setRooms(ROOMS_MOCK));
    const { rooms } = roomsSelector();

    term.yellow("Up/Down: navigate, Enter: open a room, C: create a room, Q/CRTL+C: exit game\n");

    term.singleColumnMenu(
        rooms.map((item) => `${item.name} - [${roomPlayerCount(item)}/4]`),
        (error, response) => {
            errorGaurd(error);
            const selectedOption = rooms[response.selectedIndex];
            dispatch(setSelectedRoom(selectedOption.id));
            selectTeam();
        },
    );
};

const selectTeam = async () => {
    clearTerminal();
    term.yellow("Up/Down: navigate, A/1: select team A, B/2: select team B, C: cancel and back, Q/CRTL+C: exit game\n");
    term.cyan(`Select your team/seat in room ${"(room name must be here)"}: \n\n`);
    const { selectedRoom } = roomsSelector();

    term.bgBlue.bold(`Team A:`).bgDefaultColor(` ${renderPlayerName(selectedRoom.team_a[0])} - ${renderPlayerName(selectedRoom.team_a[1])}\n`);
    term.bgYellow.bold(`Team B:`).bgDefaultColor(` ${renderPlayerName(selectedRoom.team_b[0])} - ${renderPlayerName(selectedRoom.team_b[1])}\n`);

    // const loading = await term.spinner();
    // term.hideCursor();
    // term(` Opening room ${name}`);

    // // socket with ack, open room
    // setTimeout(() => {
    //     term.hideCursor(false);
    //     loading.animate(false);
    //     clearTerminal();
    //     navigate(Windows.ROOMS);
    // }, 2000);
};

const roomPlayerCount = (room: Room): number => {
    return room.team_a.filter((i) => i !== undefined).length + room.team_b.filter((i) => i !== undefined).length;
};

const renderPlayerName = (player: Player | undefined) => {
    return player?.username ?? "[EMPTY]";
};

export default roomsWindow;
