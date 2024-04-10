import { State as GameState } from "@store/game/gameSlice";
import { gameSelector } from "@store/game/selectors";
import { Card, CardSuits } from "./types";

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

export { getPlayerKeyInGame, suiteSymbol, generateCardId };
