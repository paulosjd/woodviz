import {
    FETCH_SUMMARY_DATA_BEGIN, FETCH_SUMMARY_DATA_SUCCESS, SET_PROFILE_BOARDS, INITIAL_LOAD_DONE
} from "../constants/profile";
import {xCoordsMap, yCoordsMap} from "../constants/board";

const initialState = {
    // loading: false,
    // error: null,
    // loadError: null,
    boards: [
        {holdSet: {}, xCoords: xCoordsMap['8'], yCoords: yCoordsMap['12'], boardName: 'Set A'},
    ],
    boardsLoaded: false
};

export default function profile(state = initialState, action) {
    switch (action.type) {
        case SET_PROFILE_BOARDS:
            return { ...state, boards: action.value};
        case INITIAL_LOAD_DONE:
            return { ...state, boardsLoaded: true};
        default:
            return state
    }
}