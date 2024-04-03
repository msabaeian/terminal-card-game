import store, { RootState } from "./store";
import { roomsAdapter } from "@store/roomsSlice";

// user
const userSelector = () => {
    return store.getState().user;
};

// rooms
const roomsAdapterSelector = roomsAdapter.getSelectors<RootState>((state) => state.rooms.rooms);
const roomsSelector = () => {
    const state = store.getState();
    return {
        rooms: roomsAdapterSelector.selectAll(state),
        selectedRoom: roomsAdapterSelector.selectById(state, state.rooms.selectedRoomId),
    };
};

export { userSelector, roomsSelector };
