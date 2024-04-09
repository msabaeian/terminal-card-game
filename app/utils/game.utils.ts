import { State as GameState } from "@store/game/gameSlice";
import { gameSelector } from "@store/game/selectors";

const getPlayerKeyInGame = (
    userId: string,
): "playerBottom" | "playerLeft" | "playerRight" | "playerTop" | undefined => {
    const { playerBottom, playerLeft, playerRight, playerTop } = gameSelector();

    switch (userId) {
        case playerTop?.id:
            return "playerTop";
        case playerBottom?.id:
            return "playerBottom";
        case playerLeft?.id:
            return "playerLeft";
        case playerRight?.id:
            return "playerRight";
        default:
            return undefined;
    }
};

export { getPlayerKeyInGame };
