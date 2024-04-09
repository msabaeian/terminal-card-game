import store from "@store/store";

const gameSelector = () => {
    return store.getState().game;
};

export { gameSelector };
