import {
    FETCH_SUMMARY_DATA_BEGIN, FETCH_SUMMARY_DATA_SUCCESS, SET_PROFILE_BOARDS
} from "../constants/profile";
import {xCoordsMap, yCoordsMap} from "../constants/board";

const initialState = {
    // loading: false,
    // error: null,
    // loadError: null,
    boards: [
        {holdSet: {}, xCoords: xCoordsMap['8'], yCoords: yCoordsMap['12'], boardName: 'Set A'},
    ]
};

export default function profile(state = initialState, action) {
    switch (action.type) {
        case SET_PROFILE_BOARDS:
            return { ...state, boards: action.value};
        default:
            return state
    }
}