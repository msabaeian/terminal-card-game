import store, { RootState } from "@store/store";
import { handCardSelector } from "./gameSlice";
import { CardSuits } from "@utils/types";

const gameSelector = () => {
    const state = store.getState();
    const { game, user } = state;
    const handCards = handCardSelector.selectAll(state);
    const turnPlayer =
        [game.playerTop, game.playerRight, game.playerBottom, game.playerLeft].find((pl) => pl?.isTurn) ?? null;

    return {
        ...state.game,
        handCards,
        heartsCards: handCards.filter((card) => card.type === CardSuits.HEARTS),
        diamondsCards: handCards.filter((card) => card.type === CardSuits.DIAMONDS),
        spadesCards: handCards.filter((card) => card.type === CardSuits.SPADES),
        clubsCards: handCards.filter((card) => card.type === CardSuits.CLUBS),
        turnPlayer,
        isMyTurn: turnPlayer && turnPlayer.id === user.user_id,
    };
};

export { gameSelector };
