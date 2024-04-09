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
    FIRST_DEAL,
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
          type: Exclude<GamePlayerActionTypes, GamePlayerActionTypes.DEAL>;
      }
    | {
          type: GamePlayerActionTypes.DEAL;
          suit: CardSuits;
          value: number;
      };
interface Player {
    id: string;
    username: string;
}

interface GamePlayer extends Player {
    isTurn: boolean;
    action: GamePlayerAction;
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

// const CardSuits = {
//     HEARTS: "HEARTS",
//     DIAMONDS: "DIAMONDS",
//     CLUBS: "CLUBS",
//     SPADES: "SPADES",
// } as const;
//
// const CardValues = {
//     TWO: 2,
//     THREE: 3,
//     FOUR: 4,
//     FIVE: 5,
//     SIX: 6,
//     SEVEN: 7,
//     EIGHT: 8,
//     NINE: 9,
//     TEN: 10,
//     JACK: 11,
//     QUEEN: 12,
//     KING: 13,
//     ACE: 14,
// } as const;

type Card = {
    type: CardSuits;
    value: CardValues;
    appearance: "❤" | "♣" | "♦" | "♠";
};

// type Deck = `${ValueOf<typeof CardSuits>}_${ValueOf<typeof CardValues>}`;

// type teamName = {[b in keyof Room]: any}[number];

export { Windows, Player, Room, Team, Teams, Cordinate, GameStages, GamePlayer };
