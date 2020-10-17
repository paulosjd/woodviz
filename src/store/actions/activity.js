import {
    SET_BOARD_LIST_INDEX, SET_CURRENT, SET_SELECTED_PANEL_HOLD, SET_SHOW_BOARD_ADD,
    SET_SHOW_BOARD_NAME_EDIT, SET_SHOW_BOARD_DELETE_CONFIRM, SET_PROBLEM_LIST_INDEX, SET_PROBLEM_LIST_GRADE,
    ADD_SELECTED_GRADE, REMOVE_SELECTED_GRADE
} from "../constants/activity";

export const setAction = (value) => {
    return { type: SET_CURRENT,  value }
};

export const setSelectedPanelHold = (value) => {
    return { type: SET_SELECTED_PANEL_HOLD,  value }
};

export const setBoardListIndex = (value) => {
    return { type: SET_BOARD_LIST_INDEX,  value }
};

export const setProblemListIndex = (value) => {
    return { type: SET_PROBLEM_LIST_INDEX,  value }
};

export const setShowBoardAdd = (value) => {
    return { type: SET_SHOW_BOARD_ADD,  value }
};

export const setShowBoardNameEdit = (value) => {
    return { type: SET_SHOW_BOARD_NAME_EDIT,  value }
};

export const setShowBoardDeleteConfirm = (value) => {
    return { type: SET_SHOW_BOARD_DELETE_CONFIRM,  value }
};

export const addSelectedGrade = (value) => {
    return { type: ADD_SELECTED_GRADE,  value }
};

export const removeSelectedGrade = (value) => {
    return { type: REMOVE_SELECTED_GRADE,  value }
};
