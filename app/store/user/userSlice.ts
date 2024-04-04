import { Teams, Windows } from "@utils/types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type SliceType = {
    user_id: string;
    username: string;
    activeWindow: Windows;
    selectedRoomId: string | null;
    selectedTeam: Teams | null;
};

const initialState: SliceType = {
    user_id: "",
    username: "",
    activeWindow: Windows.AUTH,
    selectedRoomId: null,
    selectedTeam: null,
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
        setSelectedRoom: (state, action: PayloadAction<SliceType["selectedRoomId"]>) => {
            state.selectedRoomId = action.payload;
        },
        setSelectedTeam: (state, action: PayloadAction<SliceType["selectedTeam"]>) => {
            state.selectedTeam = action.payload;
        },
    },
});

export const { setUser, setActiveWindow, setSelectedRoom, setSelectedTeam } = userSlice.actions;
export default userSlice.reducer;
