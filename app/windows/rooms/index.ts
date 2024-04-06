import { clearTerminal, errorGuard, input } from "@utils/terminal";
import { Player, Room, Teams, Windows } from "@utils/types";
import { terminal as term } from "terminal-kit";
import { dispatch } from "@store/store";
import { roomsSelector } from "@store/rooms/selectors";
import { setActiveScene, setSelectedRoom } from "@store/user/userSlice";
import { navigate } from "@utils/navigation";
import { createRoom } from "@windows/rooms/actions";
import { RoomScenes, RoomsInputKeys } from "@windows/rooms/types";

const roomsWindow = () => {
    const { rooms } = roomsSelector();

    term.yellow(
        `Up/Down: navigate, Enter: open a room, ${RoomsInputKeys.CREATE_ROOM}: create a room, Q/CRTL+C: exit game\n`,
    );

    term.singleColumnMenu(
        rooms.map((item) => `${item.name} - [${roomPlayersCount(item)}/4]`),
        (error, response) => {
            errorGuard(error);
            const selectedOption = rooms[response.selectedIndex];
            dispatch(setSelectedRoom(selectedOption.id));
            seatsInRoomScene();
        },
    );
};

const seatsInRoomScene = () => {
    clearTerminal();
    dispatch(setActiveScene(RoomScenes.SELECT_SEAT));
    const { selectedRoom } = roomsSelector();

    term.yellow(
        `Up/Down: navigate,${RoomsInputKeys.SELECT_TEAM_A}: select team A, ${RoomsInputKeys.SELECT_TEAM_B}: select team B, ${RoomsInputKeys.CANCEL_SEAT_SELECTION}: cancel and back, ${RoomsInputKeys.UNSELECT_SEAT}: unselect team, Q/CRTL+C: exit game\n`,
    );

    if (selectedRoom) {
        term.cyan(`Select your team/seat in room ${selectedRoom.name}: \n\n`);
        term.bgBlue.bold
            .white(`Team A:`)
            .bgDefaultColor(
                ` ${getPlayerName(selectedRoom[Teams.A][0])} - ${getPlayerName(selectedRoom[Teams.A][1])}\n`,
            );
        term.bgYellow
            .bold(`Team B:`)
            .bgDefaultColor(
                ` ${getPlayerName(selectedRoom[Teams.B][0])} - ${getPlayerName(selectedRoom[Teams.B][1])}\n`,
            );
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

const createRoomScene = async () => {
    dispatch(setActiveScene(RoomScenes.CREATE_ROOM));
    const roomName = await input({
        message: "Enter your desired room name: ",
        required: true,
    });
    const createdRoomId = await createRoom(roomName);
    dispatch(setSelectedRoom(createdRoomId));
    seatsInRoomScene();
};

const roomPlayersCount = (room: Room): number => {
    return room.team_a.filter((i) => i).length + room.team_b.filter((i) => i).length;
};

const getPlayerName = (player: Player | undefined) => {
    return player?.username ?? "[EMPTY]";
};

export { seatsInRoomScene, createRoomScene };
export default roomsWindow;
