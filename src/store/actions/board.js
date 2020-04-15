import axios from 'axios'
import AuthService from '../../utils/auth_service';
import {USER_LOGOUT, authConstants as constants} from '../constants/auth';
import { RESET_BOARD_STATE, SET_BOARD_POINTS
} from "../constants/board";

export const resetBoardState = () => {
    return { type: RESET_BOARD_STATE }
};

export const setBoardPoints = (value) => {
    return { type: SET_BOARD_POINTS,  value}
};
