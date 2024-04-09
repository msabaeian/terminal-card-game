import { configureStore } from "@reduxjs/toolkit";
import userReducer from "@store/user/userSlice";
import { Dispatch } from "redux";
import roomsSlice from "@store/rooms/roomsSlice";
import gameSlice from "@store/game/gameSlice";

export const store = configureStore({
    reducer: {
        user: userReducer,
        rooms: roomsSlice,
        game: gameSlice,
    },
    devTools: false,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const dispatch: Dispatch = (action) => store.dispatch(action);

export default store;
