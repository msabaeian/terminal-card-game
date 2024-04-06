import { navigate } from "@utils/navigation";
import { Teams, Windows } from "@utils/types";
import { cancelSeatSelection, selectTeamInSelectedRoom, unSelectTeamInSelectedRoom } from "@store/rooms/actions";
import { createRoomScene, seatsInRoomScene } from "@windows/rooms/index";
import { userSelector } from "@store/user/selectors";
import { RoomScenes, RoomsInputKeys } from "@windows/rooms/types";

const handleRoomsInputs = (key: string) => {
    const { activeScene } = userSelector();

    switch (activeScene) {
        case null:
            return handleMainScene(key);
        case RoomScenes.SELECT_SEAT:
            return handleInputsForSelectSeatScene(key);
        default:
            break;
    }
};

const handleMainScene = (key: string) => {
    switch (key) {
        case RoomsInputKeys.CREATE_ROOM:
            createRoomScene();
            break;
        default:
            break;
    }
};

const handleInputsForSelectSeatScene = (key: string) => {
    switch (key) {
        case RoomsInputKeys.CANCEL_SEAT_SELECTION:
            cancelSeatSelection();
            break;
        case RoomsInputKeys.UNSELECT_SEAT: // for unselect
            unSelectTeamInSelectedRoom();
            seatsInRoomScene();
            break;
        case RoomsInputKeys.SELECT_TEAM_B:
            selectTeamInSelectedRoom(Teams.B);
            seatsInRoomScene();
            break;
        case RoomsInputKeys.SELECT_TEAM_A:
            selectTeamInSelectedRoom(Teams.A);
            seatsInRoomScene();
            break;
        // TODO: delete this
        case RoomsInputKeys.START_GAME: // for start
            navigate(Windows.ROOM);
            break;
        default:
            break;
    }
};

export default handleRoomsInputs;
