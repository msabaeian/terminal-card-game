import { Windows } from "@utils/types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type SliceType = {
    user_id: string;
    username: string;
    activeWindow: Windows;
};

const initialState: SliceType = {
    user_id: "",
    username: "",
    activeWindow: Windows.AUTH,
};

const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        setUser(state, action: PayloadAction<Pick<SliceType, "user_id" | "username">>) {
            state.user_id = action.payload.user_id;
            state.username = action.payload.username;
        },
        setActiveWindow(state, action: PayloadAction<Windows>) {
            state.activeWindow = action.payload;
        },
    },
});

export const { setUser, setActiveWindow } = userSlice.actions;
export default userSlice.reducer;
