import {RESET_ACTIVITY_STATE, SET_CURRENT, SET_SELECTED_PANEL_HOLD, SHOW_HOLDS_SAVED_NOTE, SET_BOARD_LIST_INDEX,
    SET_SHOW_BOARD_ADD, SET_SHOW_BOARD_NAME_EDIT, SET_SHOW_BOARD_DELETE_CONFIRM, SET_PROBLEM_LIST_INDEX,
    SET_PROBLEM_LIST_GRADE
} from '../constants/activity'
import {SET_SELECTED_HOLD} from "../constants/board";

const initialState = {
    current: 'problems',
    selectedPanelHoldX: null,
    selectedPanelHoldY: null,
    showHoldsSavedNote: false,
    boardListIndex: 0,
    problemListIndex: 0,
    showBoardNameEdit: false,
    showBoardDeleteConfirm: false,
    showBoardAdd: false,
    problemListGrade: '',
    selectedGrades: [],
};

export default function activity(state = initialState, action) {
    const partInitState = { ...state, showBoardAdd: false };
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
        case SET_PROBLEM_LIST_INDEX:
            return {
                ...state,
                problemListIndex: action.value
            };
        case SET_PROBLEM_LIST_GRADE:
            return {
                ...state,
                problemListGrade: action.value
            };
        case SET_SHOW_BOARD_NAME_EDIT:
            return {
                ...state,
                showBoardAdd: false,
                showBoardNameEdit: action.value
            };
        case SET_SHOW_BOARD_DELETE_CONFIRM:
            return {
                ...partInitState,
                showBoardNameEdit: false,
                showBoardDeleteConfirm: action.value
            };
        default:
            return state
    }
}
