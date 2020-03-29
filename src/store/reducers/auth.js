import { userConstants } from '../constants/user';

const initalState = {
    username: '',
    user_id: '',
    email: '',
};

export default function authentication(state = initalState, action) {
    switch (action.type) {
        case userConstants.LOGIN_SUCCESS:
            return {...action.user};
        default:
            return state
    }
}