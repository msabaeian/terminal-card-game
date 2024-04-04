import { dispatch } from "@store/store";
import { setRoom } from "@store/rooms/roomsSlice";
import { userSelector } from "@store/user/selectors";
import { roomsSelector } from "@store/rooms/selectors";
import { deepCopy } from "@utils/object.utils";
import { setSelectedTeam } from "@store/user/userSlice";
import { Teams } from "@utils/types";

const selectTeamInSelectedRoom = (teamKey: Teams) => {
    const { user_id, username, selectedTeam } = userSelector();
    if (selectedTeam) {
        unSelectTeamInSelectedRoom();
    }

    const { selectedRoom } = roomsSelector();
    if (selectedRoom) {
        let updatedRoom = deepCopy(selectedRoom);

        if (!updatedRoom[teamKey][0]) {
            updatedRoom[teamKey][0] = {
                id: user_id,
                username: username,
            };
        } else if (!updatedRoom[teamKey][1]) {
            updatedRoom[teamKey][1] = {
                id: user_id,
                username: username,
            };
        }

        dispatch(setSelectedTeam(teamKey));

        dispatch(
            setRoom({
                id: selectedRoom.id,
                data: updatedRoom,
            }),
        );
    }
};

const unSelectTeamInSelectedRoom = () => {
    const { selectedTeam, username } = userSelector();
    const { selectedRoom } = roomsSelector();

    if (selectedRoom) {
        let updatedRoom = deepCopy(selectedRoom);

        if (updatedRoom[selectedTeam!][0]!.username === username) {
            updatedRoom[selectedTeam!][0] = undefined;
        } else if (updatedRoom[selectedTeam!][1]!.username === username) {
            updatedRoom[selectedTeam!][1] = undefined;
        }

        dispatch(setSelectedTeam(null));

        dispatch(
            setRoom({
                id: selectedRoom.id,
                data: updatedRoom,
            }),
        );
    }
};

export { selectTeamInSelectedRoom, unSelectTeamInSelectedRoom };
