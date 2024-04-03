import {Room, Windows} from "@utils/types";
import {createSlice, PayloadAction, createEntityAdapter, EntityState} from "@reduxjs/toolkit";

type State = {
    rooms: EntityState<Room, string>;
    selectedRoomId: string;
}
export const roomsAdapter = createEntityAdapter<Room>();

const initialState: State = {
    rooms: roomsAdapter.getInitialState(),
    selectedRoomId: "",
};

const roomsSlice = createSlice({
    name: "rooms",
    initialState,
    reducers: {
        setRooms: (state, action: PayloadAction<Room[]>) => {
            roomsAdapter.setAll(state.rooms, action.payload)
        },
        setRoomPlayers: (state, action: PayloadAction<{id: string, data: Room}>) => {
            roomsAdapter.updateOne(state.rooms, {
                id: action.payload.id,
                changes: action.payload.data
            })
        },
        setSelectedRoom: (state, action: PayloadAction<string>) => {
            state.selectedRoomId = action.payload
        }
    },
});

export const { setRooms, setSelectedRoom, setRoomPlayers } = roomsSlice.actions;
export default roomsSlice.reducer;
