import { terminal as term } from "terminal-kit";
import { terminateTerminal } from "@utils/terminal";
import { gameSelector } from "@store/game/selectors";
import { GameStages, CardSuits } from "@utils/types";
import { dispatch } from "@store/store";
import { setSelectedBetValue, setSelectedCardSuite } from "@store/game/gameSlice";
import { handleActionPane } from ".";

const handleGameInputs = (key) => {
    const { stage } = gameSelector();

    if (stage === GameStages.BET) {
        handleGameBetInputs(key);
    }
};

const handleGameBetInputs = (key) => {
    const { selectedSuite, selectedBetValue, betValue } = gameSelector();
    const cardSuits = Object.values(CardSuits).filter((v) => !isNaN(Number(v)));
    const selectedSuiteIndex = cardSuits.indexOf(selectedSuite);

    switch (key) {
        case "LEFT":
            let nextValueIndex = selectedSuiteIndex + 1;
            if (nextValueIndex > cardSuits.length - 1) {
                nextValueIndex = 0;
            }
            dispatch(setSelectedCardSuite(cardSuits[nextValueIndex] as CardSuits));
            handleActionPane();
            break;
        case "RIGHT":
            let prevValueIndex = selectedSuiteIndex - 1;
            if (prevValueIndex < 0) {
                prevValueIndex = cardSuits.length - 1;
            }
            dispatch(setSelectedCardSuite(cardSuits[prevValueIndex] as CardSuits));
            handleActionPane();
            break;
        case "UP":
            if (selectedBetValue < 165) {
                dispatch(setSelectedBetValue(selectedBetValue + 5));
            }
            handleActionPane();
            break;
        case "DOWN":
            if (selectedBetValue > betValue) {
                dispatch(setSelectedBetValue(selectedBetValue - 5));
            }
            handleActionPane();
            break;
        case "p":
            handleActionPane();
            // pass
            break;
        case "ENTER":
            handleActionPane();
            break;
    }
};

export default handleGameInputs;
