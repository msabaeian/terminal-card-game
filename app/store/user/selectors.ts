import store from "@store/store";

const userSelector = () => {
    return store.getState().user;
};

export { userSelector };
