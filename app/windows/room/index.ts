import { terminal as term } from "terminal-kit";
import { errorGuard, input, viewport } from "@utils/terminal";
import Pane from "@utils/pane";
import { RoomsInputKeys } from "@windows/rooms/types";

const tablePane = new Pane({ x: 0, y: 2 }, viewport.width, viewport.height - 6);
const playerCardsPane = new Pane({ x: tablePane.bottomLeft.x, y: tablePane.bottomLeft.y + 1 }, viewport.width, 1);
const questionPane = new Pane(
    { x: playerCardsPane.bottomLeft.x, y: playerCardsPane.bottomLeft.y + 1 },
    viewport.width,
    1,
);

const roomWindow = () => {
    term.yellow(`Q/CRTL+C: exit game\n`);
    tablePane.drawCover();
    playerCardsPane.drawCover();
    drawPlayerNames();
    drawPlayerCards();
    drawEachPlayerSelectedCard();
    askMove();
};

const drawPlayerNames = () => {
    term.saveCursor();
    const turnPlayer = "MSABA";

    // left player
    let LeftPlayer = "Mojibajim";
    const isLeftPlayerTurn = turnPlayer === LeftPlayer;
    if (isLeftPlayerTurn) {
        LeftPlayer = `*${LeftPlayer}*`;
    }
    let startXPosition = tablePane.leftCenter.y - Math.round(LeftPlayer.length / 2);
    for (let i = 0; i <= LeftPlayer.length - 1; i++) {
        term.moveTo(tablePane.position.x + 2, startXPosition + i);
        if (isLeftPlayerTurn) {
            term.yellow(LeftPlayer[i]);
        } else {
            term.blue(LeftPlayer[i]);
        }
    }

    // right player
    let rightPlayer = "Alimoha";
    const isRightPlayerTurn = turnPlayer === rightPlayer;
    if (isRightPlayerTurn) {
        rightPlayer = `*${rightPlayer}*`;
    }
    for (let i = 0; i <= rightPlayer.length - 1; i++) {
        term.moveTo(tablePane.rightCenter.x - 2, startXPosition + i);
        if (isRightPlayerTurn) {
            term.yellow(rightPlayer[i]);
        } else {
            term.blue(rightPlayer[i]);
        }
    }

    // top player
    let topPlayer = "Hoss";
    const isTopPlayerTurn = turnPlayer === topPlayer;
    if (isTopPlayerTurn) {
        topPlayer = `*${topPlayer}*`;
    }
    startXPosition = tablePane.topCenter.x - Math.round(topPlayer.length / 2);
    for (let i = 0; i <= topPlayer.length - 1; i++) {
        term.moveTo(startXPosition + i, tablePane.position.y + 1);
        if (isTopPlayerTurn) {
            term.yellow(topPlayer[i]);
        } else {
            term.blue(topPlayer[i]);
        }
    }

    // bottom player
    let bottomPlayer = "MSABA";
    const isBottomPlayerTurn = turnPlayer === bottomPlayer;
    if (isBottomPlayerTurn) {
        bottomPlayer = `*${bottomPlayer}*`;
    }
    for (let i = 0; i <= bottomPlayer.length - 1; i++) {
        term.moveTo(startXPosition + i, tablePane.bottomCenter.y - 1);
        if (isBottomPlayerTurn) {
            term.yellow(bottomPlayer[i]);
        } else {
            term.blue(bottomPlayer[i]);
        }
    }
    term.restoreCursor();
};

const drawPlayerCards = () => {
    term.saveCursor();
    playerCardsPane.clear();
    term.moveTo(playerCardsPane.topLeft.x, playerCardsPane.topLeft.y)("Your Cards: ");
    term.red("10❤:1 8❤:2 A❤:3 S❤:4");
    term.yellow(" | ");
    term.black("7♣:5 9♣:6 Q♣:7 K♣:8");
    term.yellow(" | ");
    term.red("7♦:9 6♦:10 2♦:11 J♦:12");
    term.yellow(" | ");
    term.black("3♣:13 8♣:14 2♣:15 2♣:16");
    term.restoreCursor();
};

const askMove = async () => {
    term.moveTo(questionPane.topLeft.x, questionPane.topLeft.y);
    const move = await input({
        message: "What is your move? ",
        clearBeforeInput: false,
        clearAfterResponse: false,
        required: true,
    });
    questionPane.clear();
    askMove();
};

const drawEachPlayerSelectedCard = () => {
    term.saveCursor();

    // top player card
    term.moveTo(tablePane.topMidCenter.x, tablePane.topMidCenter.y);
    term("3❤");

    // right player card
    term.moveTo(tablePane.rightMidCenter.x, tablePane.rightMidCenter.y);
    term("8❤");

    // left player card
    term.moveTo(tablePane.leftMidCenter.x, tablePane.leftMidCenter.y);
    term("10❤");

    // bottom player card
    term.moveTo(tablePane.bottomMidCenter.x, tablePane.bottomMidCenter.y);
    term("Q♣");

    term.restoreCursor();
};
export default roomWindow;
