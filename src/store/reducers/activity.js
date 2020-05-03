import {RESET_ACTIVITY_STATE, SET_CURRENT, SET_SELECTED_PANEL_HOLD, SHOW_HOLDS_SAVED_NOTE, SET_BOARD_LIST_INDEX,
    SET_SHOW_BOARD_ADD,
} from '../constants/activity'
import {SET_SELECTED_HOLD} from "../constants/board";

const initialState = {
    current: 'problems',
    selectedPanelHoldX: null,
    selectedPanelHoldY: null,
    showHoldsSavedNote: false,
    boardListIndex: 0,
    showBoardAdd: false,
};

export default function activity(state = initialState, action) {
    const partInitState = { ...state, showBoardAdd: false };
    switch(action.type) {
        case RESET_ACTIVITY_STATE:
            return { ...initialState };
        case SET_CURRENT:
            return { ...partInitState, current: action.value, selectedPanelHoldX: null, selectedPanelHoldY: null };
        case SET_SELECTED_HOLD:
            return { ...partInitState, selectedPanelHoldX: null, selectedPanelHoldY: null };
        case SET_SELECTED_PANEL_HOLD:
            return { ...partInitState, ...action.value };
        case SHOW_HOLDS_SAVED_NOTE:
            return { ...state, showHoldsSavedNote: action.value };
        case SET_BOARD_LIST_INDEX:
            return { ...partInitState, boardListIndex: action.value };
        case SET_SHOW_BOARD_ADD:
            return { ...state, showBoardAdd: action.value };
        default:
            return state
    }
}
