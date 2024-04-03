import { navigate } from "@utils/navigation";
import { Windows } from "@utils/types";

const handleRoomsInputs = (key) => {
    switch (key) {
        case "r":
            // create room
            break;
        case "c":
            navigate(Windows.ROOMS);
            break;
        case "b":
            // select team b
            break;
        case "a":
            // select team a
            break;
        default:
            break;
    }
};

export default handleRoomsInputs;
