import store, { RootState } from "@store/store";
import { handCardSelector } from "./gameSlice";
import { CardSuits } from "@utils/types";

const gameSelector = () => {
    const state = store.getState();
    const { game } = state;
    const handCards = handCardSelector.selectAll(state);

    return {
        ...state.game,
        handCards,
        heartsCards: handCards.filter((card) => card.type === CardSuits.HEARTS),
        diamondsCards: handCards.filter((card) => card.type === CardSuits.DIAMONDS),
        spadesCards: handCards.filter((card) => card.type === CardSuits.SPADES),
        clubsCards: handCards.filter((card) => card.type === CardSuits.CLUBS),
        turnPlayer:
            [game.playerTop, game.playerRight, game.playerBottom, game.playerLeft].find((pl) => pl?.isTurn) ?? null,
    };
};

export { gameSelector };
