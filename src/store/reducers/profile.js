import {
    SET_PROFILE_BOARDS, SET_PROFILE_BOARD_PROBLEMS, INITIAL_LOAD_DONE
} from "../constants/profile";
import {xCoordsMap, yCoordsMap} from "../constants/board";

const initialState = {
    // loading: false,
    // error: null,
    // loadError: null,
    boards: [
        {holdSet: {}, xCoords: xCoordsMap['8'], yCoords: yCoordsMap['12'], boardName: 'Set A'},
    ],
    boardsLoaded: false,
    boardProblems: {},  // key is board index, val is list of problems
};

export default function profile(state = initialState, action) {
    switch (action.type) {
        case SET_PROFILE_BOARDS:
            return { ...state, boards: action.value};
        case SET_PROFILE_BOARD_PROBLEMS:
            return { ...state, boardProblems: action.value};
        case INITIAL_LOAD_DONE:
            return { ...state, boardsLoaded: true};
        default:
            return state
    }
}