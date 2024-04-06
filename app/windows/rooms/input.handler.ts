import { navigate } from "@utils/navigation";
import { Teams, Windows } from "@utils/types";
import { cancelSeatSelection, selectTeamInSelectedRoom, unSelectTeamInSelectedRoom } from "@store/rooms/actions";
import { createRoomPane, seatsInRoomPane } from "@windows/rooms/index";
import { userSelector } from "@store/user/selectors";
import { RoomPanes, RoomsInputKeys } from "@windows/rooms/types";

const handleRoomsInputs = (key: string) => {
    const { activePane } = userSelector();

    switch (activePane) {
        case null:
            return handleMainPane(key);
        case RoomPanes.SELECT_SEAT:
            return handleInputsForSelectSeatPane(key);
        default:
            break;
    }
};

const handleMainPane = (key: string) => {
    switch (key) {
        case RoomsInputKeys.CREATE_ROOM:
            createRoomPane();
            break;
        default:
            break;
    }
};

const handleInputsForSelectSeatPane = (key: string) => {
    switch (key) {
        case RoomsInputKeys.CANCEL_SEAT_SELECTION:
            cancelSeatSelection();
            break;
        case RoomsInputKeys.UNSELECT_SEAT: // for unselect
            unSelectTeamInSelectedRoom();
            seatsInRoomPane();
            break;
        case RoomsInputKeys.SELECT_TEAM_B:
            selectTeamInSelectedRoom(Teams.B);
            seatsInRoomPane();
            break;
        case RoomsInputKeys.SELECT_TEAM_A:
            selectTeamInSelectedRoom(Teams.A);
            seatsInRoomPane();
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
