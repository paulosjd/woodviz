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
            return { ...action.user };
        case SET_AWAITING_AUTH:
            return { ...state, awaitingAuth: action.value };
        default:
            return state
    }
}