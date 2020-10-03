import {RESET_ACTIVITY_STATE, SET_CURRENT, SET_SELECTED_PANEL_HOLD, SHOW_HOLDS_SAVED_NOTE, SET_BOARD_LIST_INDEX,
    SET_SHOW_BOARD_ADD, SET_SHOW_BOARD_NAME_EDIT
} from '../constants/activity'
import {SET_SELECTED_HOLD} from "../constants/board";

const initialState = {
    current: 'problems',
    selectedPanelHoldX: null,
    selectedPanelHoldY: null,
    showHoldsSavedNote: false,
    boardListIndex: 0,
    showBoardNameEdit: false,
    showBoardAdd: false,
};

export default function activity(state = initialState, action) {
    const partInitState = { ...state, showBoardAdd: false };
    console.log(action.type)
    switch(action.type) {
        case RESET_ACTIVITY_STATE:
            return { ...initialState };
        case SET_CURRENT:
            return {
                ...partInitState,
                showBoardNameEdit: false,
                current: action.value,
                selectedPanelHoldX: null,
                selectedPanelHoldY: null
            };
        case SET_SELECTED_HOLD:
            return {
                ...partInitState,
                selectedPanelHoldX: null,
                selectedPanelHoldY: null
            };
        case SET_SELECTED_PANEL_HOLD:
            return {
                ...partInitState,
                ...action.value
            };
        case SHOW_HOLDS_SAVED_NOTE:
            return {
                ...state,
                showHoldsSavedNote: action.value
            };
        case SET_BOARD_LIST_INDEX:
            if (partInitState.boardListIndex === action.value) {
                return state
            }
            return {
                ...partInitState,
                showBoardNameEdit: false,
                boardListIndex: action.value
            };
        case SET_SHOW_BOARD_ADD:
            return {
                ...state,
                showBoardNameEdit: action.value ? false : state.showBoardNameEdit,
                showBoardAdd: action.value
            };
        case SET_SHOW_BOARD_NAME_EDIT:
            return {
                ...state,
                showBoardAdd: false,
                showBoardNameEdit: action.value
            };
        default:
            return state
    }
}
