import axios from 'axios'
import AuthService from '../../utils/auth_service';
import {USER_LOGOUT, authConstants as constants} from '../constants/auth';
import {
    RESET_ACTIVITY_STATE, SET_BOARD_LIST_INDEX, SET_CURRENT, SET_SELECTED_PANEL_HOLD, SET_SHOW_BOARD_ADD,
    SET_SHOW_BOARD_NAME_EDIT, SET_SHOW_BOARD_DELETE_CONFIRM
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

export const setShowBoardAdd = (value) => {
    return { type: SET_SHOW_BOARD_ADD,  value }
};

export const setShowBoardNameEdit = (value) => {
    return { type: SET_SHOW_BOARD_NAME_EDIT,  value }
};

export const setShowBoardDeleteConfirm = (value) => {
    return { type: SET_SHOW_BOARD_DELETE_CONFIRM,  value }
};