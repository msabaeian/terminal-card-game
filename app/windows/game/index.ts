import { terminal as term } from "terminal-kit";
import { input, viewport } from "@utils/terminal";
import Pane from "@utils/pane";
import { gameSelector } from "@store/game/selectors";
import { suiteSymbol } from "@utils/game.utils";
import { CardSuits, GameStages } from "@utils/types";

const infoPane = new Pane({ x: 0, y: 0 }, viewport.width, 2);
const tablePane = new Pane({ x: 0, y: infoPane.bottomLeft.y }, viewport.width, viewport.height - 6);
const handPane = new Pane({ x: tablePane.bottomLeft.x, y: tablePane.bottomLeft.y + 1 }, viewport.width, 1);
const actionPane = new Pane({ x: handPane.bottomLeft.x, y: handPane.bottomLeft.y + 1 }, viewport.width, 1);

const gameWindow = () => {
    writeInfo();
    tablePane.drawCover();
    handPane.drawCover();
    drawPlayerNames();
    drawHand();
    // drawEachPlayerMove();
    actionInput();
};

const writeInfo = () => {
    const { stage } = gameSelector();
    term.saveCursor();
    infoPane.clear();
    term.moveTo(infoPane.position.x, infoPane.position.y);
    term.yellow(`Q/CRTL+C: exit game`);

    if (stage === GameStages.BET) {
        term.yellow(` Up/Bottom: Change Selected Suits`);
    }

    term.restoreCursor();
};

const drawPlayerNames = () => {
    const { playerTop, playerBottom, playerLeft, playerRight, turnPlayer } = gameSelector();
    term.saveCursor();

    // left player
    if (playerLeft) {
        const isLeftPlayerTurn = turnPlayer?.id === playerLeft.id;
        const startYPosition = tablePane.leftCenter.y - Math.round(playerLeft.username.length / 2);
        for (let i = 0; i <= playerLeft.username.length - 1; i++) {
            term.moveTo(tablePane.position.x + 2, startYPosition + i);
            if (isLeftPlayerTurn) {
                term.green(playerLeft.username[i]);
            } else {
                term.blue(playerLeft.username[i]);
            }
        }
    }

    // right player
    if (playerRight) {
        const isRightPlayerTurn = turnPlayer?.id === playerRight.id;
        const startYPosition = tablePane.rightCenter.y - Math.round(playerRight.username.length / 2);
        for (let i = 0; i <= playerRight.username.length - 1; i++) {
            term.moveTo(tablePane.rightCenter.x - 2, startYPosition + i);
            if (isRightPlayerTurn) {
                term.green(playerRight.username[i]);
            } else {
                term.blue(playerRight.username[i]);
            }
        }
    }

    // top player
    if (playerTop) {
        const isTopPlayerTurn = turnPlayer?.id === playerTop.id;
        const startXPosition = tablePane.topCenter.x - Math.round(playerTop.username.length / 2);
        for (let i = 0; i <= playerTop.username.length - 1; i++) {
            term.moveTo(startXPosition + i, tablePane.position.y + 1);
            if (isTopPlayerTurn) {
                term.green(playerTop.username[i]);
            } else {
                term.blue(playerTop.username[i]);
            }
        }
    }

    // bottom player
    if (playerBottom) {
        const isBottomPlayerTurn = turnPlayer?.id === playerBottom.id;
        const startXPosition = tablePane.bottomCenter.x - Math.round(playerBottom.username.length / 2);
        for (let i = 0; i <= playerBottom.username.length - 1; i++) {
            term.moveTo(startXPosition + i, tablePane.bottomCenter.y - 1);
            if (isBottomPlayerTurn) {
                term.green(playerBottom.username[i]);
            } else {
                term.blue(playerBottom.username[i]);
            }
        }
    } else {
        term("hellioooooo\n");
    }

    term.restoreCursor();
};

const drawHand = () => {
    const { heartsCards, clubsCards, diamondsCards, spadesCards } = gameSelector();
    term.saveCursor();
    handPane.clear();
    term.moveTo(handPane.topLeft.x, handPane.topLeft.y)("Your Cards: ");

    heartsCards.forEach((card) => {
        term.black(card.value);
        term.red(`${suiteSymbol(CardSuits.HEARTS)} `);
    });
    term.yellow(" | ");

    clubsCards.forEach((card) => {
        term.black(`${card.value}${suiteSymbol(CardSuits.CLUBS)} `);
    });
    term.yellow(" | ");

    diamondsCards.forEach((card) => {
        term.black(card.value);
        term.red(`${suiteSymbol(CardSuits.DIAMONDS)} `);
    });
    term.yellow(" | ");

    spadesCards.forEach((card) => {
        term.black(`${card.value}${suiteSymbol(CardSuits.SPADES)} `);
    });

    term.restoreCursor();
};

const actionInput = async () => {
    term.moveTo(actionPane.topLeft.x, actionPane.topLeft.y);
    const move = await input({
        message: "What is your move? ",
        clearBeforeInput: false,
        clearAfterResponse: false,
        required: true,
    });
    actionPane.clear();
    actionInput();
};

const drawEachPlayerMove = () => {
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

export default gameWindow;
