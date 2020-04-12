import { RESET_ACTIVITY_STATE, SET_CURRENT
} from '../constants/activity'

const initialState = {
    current: 'problems'
};

export default function activity(state = initialState, action) {
    switch(action.type) {
        case RESET_ACTIVITY_STATE:
            return { ...initialState };
        case SET_CURRENT:
            return { ...state, current: action.value };
        default:
            return state
    }
}
