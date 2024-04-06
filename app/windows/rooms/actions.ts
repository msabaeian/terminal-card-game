import { userSelector } from "@store/user/selectors";
import { Room, Teams } from "@utils/types";
import { generateUUID } from "@utils/string.utils";
import { dispatch } from "@store/store";
import { addRoom } from "@store/rooms/roomsSlice";

const createRoom = (roomName: string) => {
    return new Promise<string>((resolve) => {
        const { username, user_id } = userSelector();

        const newRoomId = generateUUID();
        const room: Room = {
            id: newRoomId,
            owner_id: user_id,
            name: roomName,
            [Teams.A]: [{ id: user_id, username }, undefined],
            [Teams.B]: [undefined, undefined],
        };

        dispatch(addRoom(room));
        return resolve(newRoomId);
    });
};

export { createRoom };
