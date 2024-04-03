import store from "./store";

const userSelector = () => {
    return store.getState().user;
};

export { userSelector };
