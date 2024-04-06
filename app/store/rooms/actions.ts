import { dispatch } from "@store/store";
import { removeRoom, setRoom } from "@store/rooms/roomsSlice";
import { userSelector } from "@store/user/selectors";
import { roomsSelector } from "@store/rooms/selectors";
import { deepCopy } from "@utils/object.utils";
import { setSelectedRoom, setSelectedTeam } from "@store/user/userSlice";
import { Teams, Windows } from "@utils/types";
import { navigate } from "@utils/navigation";

const selectTeamInSelectedRoom = (teamKey: Teams) => {
    const { user_id, username, selectedTeam } = userSelector();
    if (selectedTeam) {
        unSelectTeamInSelectedRoom();
    }

    const { selectedRoom } = roomsSelector();
    if (selectedRoom && selectedRoom.owner_id !== user_id) {
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
    const { selectedTeam, username, user_id } = userSelector();
    const { selectedRoom } = roomsSelector();

    if (selectedTeam && selectedRoom && selectedRoom.owner_id !== user_id) {
        let updatedRoom = deepCopy(selectedRoom);

        if (updatedRoom[selectedTeam][0]?.username === username) {
            updatedRoom[selectedTeam][0] = undefined;
        } else if (updatedRoom[selectedTeam][1]?.username === username) {
            updatedRoom[selectedTeam][1] = undefined;
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

const cancelSeatSelection = () => {
    const { selectedRoom } = roomsSelector();
    const { user_id } = userSelector();

    if (selectedRoom) {
        if (selectedRoom.owner_id === user_id) {
            dispatch(removeRoom(selectedRoom.id));
        }
        unSelectTeamInSelectedRoom();

        dispatch(setSelectedRoom(""));
        navigate(Windows.ROOMS);
    }
};

export { selectTeamInSelectedRoom, unSelectTeamInSelectedRoom, cancelSeatSelection };
