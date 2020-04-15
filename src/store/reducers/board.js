import { RESET_BOARD_STATE, SET_BOARD_POINTS, SET_BOARD_POINTS_FROM_NUMS, xCoordsMap, yCoordsMap
} from '../constants/board'


const initialState = {
    xCoords: xCoordsMap['8'],
    yCoords: yCoordsMap['12'],
};

export default function board(state = initialState, action) {
    switch(action.type) {
        case RESET_BOARD_STATE:
            return { ...initialState };
        case SET_BOARD_POINTS_FROM_NUMS:
            return { ...state, xCoords: xCoordsMap[action.value.xNum], yCoords: yCoordsMap[action.value.yNum] };
        case SET_BOARD_POINTS:
            return { ...state, xCoords: action.value.xCoords, yCoords: action.value.yCoords };
        default:
            return state
    }
}