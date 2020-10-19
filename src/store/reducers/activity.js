import {RESET_ACTIVITY_STATE, SET_CURRENT, SET_SELECTED_PANEL_HOLD, SHOW_HOLDS_SAVED_NOTE, SET_BOARD_LIST_INDEX,
    SET_SHOW_BOARD_ADD, SET_SHOW_BOARD_NAME_EDIT, SET_SHOW_BOARD_DELETE_CONFIRM, ADD_SELECTED_GRADE,
    REMOVE_SELECTED_GRADE, SET_SELECTED_PROBLEM_ID, SET_SHOW_EDIT_PROBLEM
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
    selectedGrades: [],
    selectedProblemId: null
};

export default function activity(state = initialState, action) {
    const grades = state.selectedGrades;
    const partInitState = {
        ...state,
        selectedGrades: [],
        problemName: '',
        selectedProblemId: null
    };
    switch(action.type) {
        case RESET_ACTIVITY_STATE:
            return { ...initialState };
        case SET_CURRENT:
            return {
                ...partInitState,
                showBoardAdd: false,
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
            if (state.boardListIndex === action.value && !state.showBoardAdd) {
                return state
            }
            return {
                ...partInitState,
                showBoardAdd: false,
                showBoardNameEdit: false,
                boardListIndex: action.value
            };
        case SET_SHOW_BOARD_ADD:
            return {
                ...state,
                showBoardNameEdit: action.value ? false : state.showBoardNameEdit,
                showBoardAdd: action.value
            };
        case SET_SHOW_EDIT_PROBLEM:
            return {
                ...state,
                showBoardNameEdit: action.value ? false : state.showBoardNameEdit,
                showBoardAdd: action.value
            };
        case SET_SELECTED_PROBLEM_ID:
            return {
                ...state,
                selectedProblemId: action.value
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
        case ADD_SELECTED_GRADE:
            grades.push(action.value);
            return {
                ...state,
                selectedGrades: grades,
            };
        case REMOVE_SELECTED_GRADE:
            const gradeInd = grades.indexOf(action.value);
            if (gradeInd > -1) {
                grades.splice(gradeInd, 1)
            }
            return {
                ...state,
                selectedGrades: grades,
            };
        default:
            return state
    }
}
