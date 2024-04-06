import "module-alias/register";
import "@store/store";
import "@utils/input.handler";
import { navigate } from "@utils/navigation";
import { Windows } from "@utils/types";

const main = () => {
    navigate(Windows.AUTH);
};

main();
