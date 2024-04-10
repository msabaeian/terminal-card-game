enum Windows {
    AUTH,
    ROOMS,
    ROOM,
}

enum Teams {
    A = "team_a",
    B = "team_b",
}

enum GameStages {
    BET,
    DEAL,
    DROP,
    TURN,
    FINISH,
}

enum GamePlayerActionTypes {
    PASS,
    RAISE,
    DEAL,
}

type GamePlayerAction =
    | {
          type: Exclude<GamePlayerActionTypes, GamePlayerActionTypes.RAISE>;
      }
    | {
          type: GamePlayerActionTypes.RAISE;
          suit: CardSuits;
          value: number;
      };

interface Player {
    id: string;
    username: string;
}

interface GamePlayer extends Player {
    isTurn: boolean;
    action: GamePlayerAction | null;
}

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

enum CardSuits {
    HEARTS,
    DIAMONDS,
    CLUBS,
    SPADES,
}

enum CardValues {
    TWO = 2,
    THREE,
    FOUR,
    FIVE,
    SIX,
    SEVEN,
    EIGHT,
    NINE,
    TEN,
    JACK,
    QUEEN,
    KING,
    ACE,
}

export type ValueOf<T> = T[keyof T];

type Card = {
    // id: string;
    type: CardSuits;
    value: CardValues;
    played: boolean;
};

export {
    Windows,
    Player,
    Room,
    Team,
    Teams,
    Cordinate,
    GameStages,
    GamePlayer,
    GamePlayerAction,
    GamePlayerActionTypes,
    Card,
    CardSuits,
    CardValues,
};
