import { Card, GamePlayer, GamePlayerAction, GameStages } from "@utils/types";
import { EntityState, PayloadAction, createEntityAdapter, createSlice } from "@reduxjs/toolkit";
import { generateCardId, getPlayerKeyInGame } from "@utils/game.utils";
import { RootState } from "@store/store";

type State = {
    playerTop: GamePlayer | null;
    playerRight: GamePlayer | null;
    playerBottom: GamePlayer | null;
    playerLeft: GamePlayer | null;
    stage: GameStages;
    hand: EntityState<Card, string>;
};

export const handCardsAdapter = createEntityAdapter<Card, string>({
    selectId: (card) => generateCardId(card),
});
export const handCardSelector = handCardsAdapter.getSelectors<RootState>((state) => state.game.hand);

const initialState: State = {
    stage: GameStages.BET,
    playerBottom: null,
    playerLeft: null,
    playerRight: null,
    playerTop: null,
    hand: handCardsAdapter.getInitialState(),
};

const gameSlice = createSlice({
    name: "game",
    initialState,
    reducers: {
        setGame: (state, action: PayloadAction<Partial<State>>) => {
            Object.keys(action.payload).forEach((key) => {
                state[key] = action.payload[key];
            });
        },
        setPlayerTurn: (state, action: PayloadAction<{ userId: string; value: boolean }>) => {
            const { userId, value } = action.payload;
            const playerKey = getPlayerKeyInGame(userId);
            if (playerKey && state[playerKey]) {
                state[playerKey]!.isTurn = value;
            }
        },
        setPlayerAction: (state, action: PayloadAction<{ userId: string; value: GamePlayerAction }>) => {
            const { userId, value } = action.payload;
            const playerKey = getPlayerKeyInGame(userId);
            if (playerKey && state[playerKey]) {
                state[playerKey]!.action = value;
            }
        },
        addCards: (state, action: PayloadAction<Card[]>) => {
            handCardsAdapter.addMany(state.hand, action.payload);
        },
        resetState: () => initialState,
    },
});

export const { setGame, resetState, setPlayerAction, setPlayerTurn, addCards } = gameSlice.actions;
export type { State };
export default gameSlice.reducer;
