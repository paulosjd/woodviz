import { applyMiddleware, combineReducers, createStore } from "redux";
import thunk from "redux-thunk";
import activity from "./reducers/activity"
import auth from "./reducers/auth"
import board from "./reducers/board"
import profile from  "./reducers/profile"
import registration from "./reducers/reg"
import { USER_LOGOUT } from "./constants/auth"

const appReducer = combineReducers({
    activity,
    auth,
    board,
    profile,
    registration
});

const rootReducer = (state, action) => {
    if (action.type === USER_LOGOUT) {
        state = undefined
    }
    return appReducer(state, action)
};

export const root = createStore(
    rootReducer,
    applyMiddleware(thunk)
);
