import { LOGIN_SUCCESS, SET_AWAITING_AUTH } from '../constants/auth';

const initalState = {
    awaitingAuth: false,
    username: '',
    user_id: '',
    email: '',
};

export default function authentication(state = initalState, action) {
    switch (action.type) {
        case LOGIN_SUCCESS:
            // action.user e.g. { user_id: 34, username: "ben", exp: 1604934179, email: "foo@bar.com" }
            return { ...action.user, awaitingAuth: false };
        case SET_AWAITING_AUTH:
            return { ...state, awaitingAuth: action.value };
        default:
            return state
    }
}