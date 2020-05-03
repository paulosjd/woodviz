import axios from 'axios'
import AuthService from '../../utils/auth_service';
import {USER_LOGOUT, authConstants as constants} from '../constants/auth';
import { RESET_BOARD_STATE, SET_HOLD, SET_HOVER_HOLD, SET_SELECTED_HOLD, DEL_HOLD
} from "../constants/board";

export const resetBoardState = () => {
    return { type: RESET_BOARD_STATE }
};

export const setHandHold = (value) => {
    return { type: SET_HOLD,  value }
};

export const delHandHold = () => {
    return { type: DEL_HOLD }
};

export const setHoverHold = (value) => {
    return { type: SET_HOVER_HOLD,  value }
};

export const setSelectedHold = (value) => {
    return { type: SET_SELECTED_HOLD,  value }
};
