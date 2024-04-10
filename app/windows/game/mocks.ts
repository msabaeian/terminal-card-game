import { CardSuits, CardValues, GameStages, Player } from "@utils/types";
import { generateUUID } from "@utils/string.utils";
import { dispatch } from "@store/store";
import { addCards, setGame } from "@store/game/gameSlice";
import { userSelector } from "@store/user/selectors";

const PLAYERS_MOCK: Player[] = [
    {
        id: generateUUID(),
        username: "hoss",
    },
    {
        id: generateUUID(),
        username: "mojibaj",
    },
    {
        id: generateUUID(),
        username: "hovei",
    },
];

const setMockGame = () => {
    const { user_id, username } = userSelector();
    dispatch(
        setGame({
            playerTop: {
                ...PLAYERS_MOCK[0],
                isTurn: false,
                action: null,
            },
            playerRight: {
                ...PLAYERS_MOCK[1],
                isTurn: false,
                action: null,
            },
            playerLeft: {
                ...PLAYERS_MOCK[2],
                isTurn: false,
                action: null,
            },
            playerBottom: {
                username: username,
                id: user_id,
                isTurn: true,
                action: null,
            },
            stage: GameStages.BET,
        }),
    );

    dispatch(
        addCards([
            {
                played: false,
                type: CardSuits.CLUBS,
                value: CardValues.NINE,
            },
            {
                played: false,
                type: CardSuits.DIAMONDS,
                value: CardValues.ACE,
            },
            {
                played: false,
                type: CardSuits.HEARTS,
                value: CardValues.THREE,
            },
            {
                played: false,
                type: CardSuits.SPADES,
                value: CardValues.JACK,
            },
        ]),
    );
};

export { PLAYERS_MOCK, setMockGame };
