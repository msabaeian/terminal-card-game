enum Windows {
    AUTH,
    ROOMS,
    ROOM,
}

type Player = {
    id: string;
    username: string;
};

type Room = {
    id: string;
    name: string;
    team_a: [Player?, Player?];
    team_b: [Player?, Player?];
};

export { Windows, Player, Room };
