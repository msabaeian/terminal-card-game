import { State as GameState } from "@store/game/gameSlice";
import { gameSelector } from "@store/game/selectors";
import { Card, CardSuits, GamePlayerAction, GamePlayerActionTypes } from "./types";

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

const suiteSymbol = (type: CardSuits): string => {
    const symbol = {
        [CardSuits.CLUBS]: "♣",
        [CardSuits.DIAMONDS]: "♦",
        [CardSuits.HEARTS]: "❤",
        [CardSuits.SPADES]: "♠",
    };
    return symbol[type];
};

const generateCardId = (card: Pick<Card, "type" | "value">) => `${card.type}-${card.value}`;

const playerMove = (action: GamePlayerAction) => {
    if (action.type === GamePlayerActionTypes.PASS) {
        return "PASS!";
    } else if (action.type === GamePlayerActionTypes.DEAL) {
        return "DEAL!";
    } else if (action.type === GamePlayerActionTypes.RAISE) {
        return "RAISE!";
    }
    return "";
};

export { getPlayerKeyInGame, suiteSymbol, generateCardId, playerMove };
