import {RESET_ACTIVITY_STATE, SET_CURRENT, SET_SELECTED_PANEL_HOLD, SHOW_HOLDS_SAVED_NOTE
} from '../constants/activity'
import {SET_SELECTED_HOLD} from "../constants/board";

const initialState = {
    current: 'problems',
    selectedPanelHoldX: null,
    selectedPanelHoldY: null,
    showHoldsSavedNote: false,
};

export default function activity(state = initialState, action) {
    switch(action.type) {
        case RESET_ACTIVITY_STATE:
            return { ...initialState };
        case SET_CURRENT:
            return { ...state, current: action.value, selectedPanelHoldX: null, selectedPanelHoldY: null };
        case SET_SELECTED_HOLD:
            return { ...state, selectedPanelHoldX: null, selectedPanelHoldY: null };
        case SET_SELECTED_PANEL_HOLD:
            return { ...state, ...action.value };
        case SHOW_HOLDS_SAVED_NOTE:
            return { ...state, ...action.value };
        default:
            return state
    }
}
