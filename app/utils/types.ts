enum Windows {
    AUTH,
    ROOMS,
    ROOM,
}

enum Teams {
    A = "team_a",
    B = "team_b",
}

type Player = {
    id: string;
    username: string;
};

type Team = [Player?, Player?];

type Room = {
    id: string;
    name: string;
    owner_id: string;
    [Teams.A]: Team;
    [Teams.B]: Team;
};

type Cordinate = {
    x: number;
    y: number;
};
// type teamName = {[b in keyof Room]: any}[number];

export { Windows, Player, Room, Team, Teams, Cordinate };
