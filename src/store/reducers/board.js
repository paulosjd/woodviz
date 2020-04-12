import { RESET_BOARD_STATE, SET_BOARD_POINTS
} from '../constants/board'

const initialState = {
    xCoords: [],
    yCoords: [],
};

export default function board(state = initialState, action) {
    switch(action.type) {
        case RESET_BOARD_STATE:
            return { ...initialState };
        case SET_BOARD_POINTS:
            return { ...state, xCoords: action.value.xCoords, yCoords: action.value.yCoords };
        default:
            return state
    }
}