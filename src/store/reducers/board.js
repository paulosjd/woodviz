import { RESET_BOARD_STATE, SET_BOARD_POINTS, SET_BOARD_POINTS_FROM_NUMS, SET_HOVER_HOLD, SET_SELECTED_HOLD,
    xCoordsMap, yCoordsMap
} from '../constants/board'
import { SET_CURRENT } from '../constants/activity'

const initialState = {
    xCoords: xCoordsMap['8'],
    yCoords: yCoordsMap['12'],
    hoverHoldX: null,
    hoverHoldY: null,
    selectedHoldY: null,
    selectedHoldX: null,
    holdSet: {},
};

export default function board(state = initialState, action) {
    switch(action.type) {
        case RESET_BOARD_STATE:
            return { ...initialState };
        case SET_BOARD_POINTS_FROM_NUMS:
            return { ...state, xCoords: xCoordsMap[action.value.xNum], yCoords: yCoordsMap[action.value.yNum] };
        case SET_BOARD_POINTS:
            return { ...state, xCoords: action.value.xCoords, yCoords: action.value.yCoords };
        case SET_CURRENT:
            return { ...state, selectedHoldX: null, selectedHoldY: null };
        case SET_SELECTED_HOLD:
            return { ...state, ...action.value };
        case SET_HOVER_HOLD:
            return { ...state, ...action.value };
        default:
            return state
    }
}