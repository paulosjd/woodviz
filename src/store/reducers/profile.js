import {
    SET_PROFILE_BOARDS, INITIAL_LOAD_DONE, SET_TEMP_LISTS, RESET_PROFILE_STATE
} from "../constants/profile";
import {xCoordsMap, yCoordsMap} from "../constants/board";
import {SET_BOARD_LIST_INDEX, SET_CURRENT, SET_SELECTED_PROBLEM_ID, SET_SHOW_PROBLEM_EDIT} from "../constants/activity";

const initialState = {
    boards: [
        {holdSet: {}, xCoords: xCoordsMap['8'], yCoords: yCoordsMap['12'], boardName: ''},
    ],
    boardsLoaded: false,
    tempXList: [],
    tempYList: []
};


export default function profile(state = initialState, action) {

    const newState = { ...state, tempXList: [], tempYList: []};
    [SET_SHOW_PROBLEM_EDIT, SET_SELECTED_PROBLEM_ID, SET_BOARD_LIST_INDEX, SET_CURRENT].forEach(i => {
        if (action.type === i) {
            return newState
        }
    });

    switch (action.type) {
        case RESET_PROFILE_STATE:
            return initialState;
        case SET_PROFILE_BOARDS:
            return {
                ...newState,
                boards: action.value
            };
        case SET_TEMP_LISTS:
            return {
                ...state,
                tempXList: action.value.tempXList,
                tempYList: action.value.tempYList
            };
        case INITIAL_LOAD_DONE:
            return {
                ...newState,
                boardsLoaded: true
            };
        case SET_SHOW_PROBLEM_EDIT:
            return newState;
        default:
            return state
    }
}