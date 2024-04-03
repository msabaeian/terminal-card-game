import "module-alias/register";
import "@store/store";
import { navigate } from "@utils/navigation";
import { Windows } from "@utils/types";

const main = () => {
    navigate(Windows.AUTH);
    // register key listener
};

main();
