// rooms
import { roomsAdapter } from "@store/rooms/roomsSlice";
import store, { RootState } from "@store/store";

const roomsAdapterSelector = roomsAdapter.getSelectors<RootState>((state) => state.rooms.rooms);
const roomsSelector = () => {
    const state = store.getState();
    return {
        rooms: roomsAdapterSelector.selectAll(state),
        selectedRoom: state.user.selectedRoomId ? roomsAdapterSelector.selectById(state, state.user.selectedRoomId) : null,
    };
};

export { roomsSelector };
