import { Room } from "@utils/types";
import { createSlice, PayloadAction, createEntityAdapter, EntityState } from "@reduxjs/toolkit";

type State = {
    rooms: EntityState<Room, string>;
};
export const roomsAdapter = createEntityAdapter<Room>();

const initialState: State = {
    rooms: roomsAdapter.getInitialState(),
};

const roomsSlice = createSlice({
    name: "rooms",
    initialState,
    reducers: {
        setRooms: (state, action: PayloadAction<Room[]>) => {
            roomsAdapter.setAll(state.rooms, action.payload);
        },
        setRoom: (state, action: PayloadAction<{ id: string; data: Room }>) => {
            roomsAdapter.updateOne(state.rooms, {
                id: action.payload.id,
                changes: action.payload.data,
            });
        },
        addRoom: (state, action: PayloadAction<Room>) => {
            roomsAdapter.addOne(state.rooms, action.payload);
        },
        removeRoom: (state, action: PayloadAction<string>) => {
            roomsAdapter.removeOne(state.rooms, action.payload);
        },
    },
});

export const { setRooms, setRoom, addRoom, removeRoom } = roomsSlice.actions;
export default roomsSlice.reducer;
