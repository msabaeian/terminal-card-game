import { navigate } from "@utils/navigation";
import { Teams, Windows } from "@utils/types";
import { dispatch } from "@store/store";
import { selectTeamInSelectedRoom, unSelectTeamInSelectedRoom } from "@store/rooms/actions";
import { renderSeatsInRoom } from "@windows/rooms/index";
import { setSelectedRoom } from "@store/user/userSlice";

const handleRoomsInputs = (key: string) => {
    switch (key) {
        case "r":
            // create room
            break;
        case "c":
            dispatch(setSelectedRoom(""));
            navigate(Windows.ROOMS);
            break;
        case "u":
            unSelectTeamInSelectedRoom();
            renderSeatsInRoom();
            break;
        case "2":
        case "b":
            selectTeamInSelectedRoom(Teams.B);
            renderSeatsInRoom();
            break;
        case "1":
        case "a":
            selectTeamInSelectedRoom(Teams.A);
            renderSeatsInRoom();
            break;
        default:
            break;
    }
};

export default handleRoomsInputs;
