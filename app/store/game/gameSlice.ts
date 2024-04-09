import { GamePlayer, GameStages } from "@utils/types";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { getPlayerKeyInGame } from "@utils/game.utils";

type State = {
    playerTop: GamePlayer | null;
    playerRight: GamePlayer | null;
    playerBottom: GamePlayer | null;
    playerLeft: GamePlayer | null;
    stage: GameStages;
};

const initialState: State = {
    stage: GameStages.FIRST_DEAL,
    playerBottom: null,
    playerLeft: null,
    playerRight: null,
    playerTop: null,
};

const gameSlice = createSlice({
    name: "game",
    initialState,
    reducers: {
        setGame: (state, action: PayloadAction<State>) => {
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
        setPlayerAction: (state, action: PayloadAction<{ userId: string; value: boolean }>) => {
            const { userId, value } = action.payload;
            const playerKey = getPlayerKeyInGame(userId);
            if (playerKey && state[playerKey]) {
                state[playerKey]!.isTurn = value;
            }
        },
        resetState: () => initialState,
    },
});

export const {} = gameSlice.actions;
export type { State };
export default gameSlice.reducer;
