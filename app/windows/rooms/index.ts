import { clearTerminal, errorGuard } from "@utils/terminal";
import { Player, Room, Teams, Windows } from "@utils/types";
import { terminal as term } from "terminal-kit";
import { dispatch } from "@store/store";
import { setRooms } from "@store/rooms/roomsSlice";
import { ROOMS_MOCK } from "@windows/rooms/mocks";
import { roomsSelector } from "@store/rooms/selectors";
import { setSelectedRoom } from "@store/user/userSlice";
import { navigate } from "@utils/navigation";

const roomsWindow = () => {
    dispatch(setRooms(ROOMS_MOCK));
    const { rooms } = roomsSelector();

    term.yellow("Up/Down: navigate, Enter: open a room, C: create a room, Q/CRTL+C: exit game\n");

    term.singleColumnMenu(
        rooms.map((item) => `${item.name} - [${roomPlayersCount(item)}/4]`),
        (error, response) => {
            errorGuard(error);
            const selectedOption = rooms[response.selectedIndex];
            dispatch(setSelectedRoom(selectedOption.id));
            renderSeatsInRoom();
        },
    );
};

const renderSeatsInRoom = () => {
    clearTerminal();
    term.yellow("Up/Down: navigate, A/1: select team A, B/2: select team B, C: cancel and back, U: unselect team, Q/CRTL+C: exit game\n");
    term.cyan(`Select your team/seat in room ${"(room name must be here)"}: \n\n`);
    const { selectedRoom } = roomsSelector();
    if (selectedRoom) {
        term.bgBlue.bold.white(`Team A:`).bgDefaultColor(` ${renderPlayerName(selectedRoom[Teams.A][0])} - ${renderPlayerName(selectedRoom[Teams.A][1])}\n`);
        term.bgYellow.bold(`Team B:`).bgDefaultColor(` ${renderPlayerName(selectedRoom[Teams.B][0])} - ${renderPlayerName(selectedRoom[Teams.B][1])}\n`);
    } else {
        navigate(Windows.ROOMS);
    }

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

const roomPlayersCount = (room: Room): number => {
    return room.team_a.filter((i) => i !== undefined).length + room.team_b.filter((i) => i !== undefined).length;
};

const renderPlayerName = (player: Player | undefined) => {
    return player?.username ?? "[EMPTY]";
};

export { renderSeatsInRoom };
export default roomsWindow;
