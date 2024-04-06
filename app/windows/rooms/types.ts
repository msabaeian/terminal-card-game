enum RoomScenes {
    CREATE_ROOM,
    SELECT_SEAT,
}
enum RoomsInputKeys {
    CREATE_ROOM = "r",
    START_GAME = "s",
    CANCEL_SEAT_SELECTION = "c",
    UNSELECT_SEAT = "u",
    SELECT_TEAM_B = "b",
    SELECT_TEAM_A = "a",
}

export { RoomScenes, RoomsInputKeys };
