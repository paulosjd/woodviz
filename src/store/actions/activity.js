import axios from 'axios'
import AuthService from '../../utils/auth_service';
import {USER_LOGOUT, authConstants as constants} from '../constants/auth';
import { RESET_ACTIVITY_STATE, SET_CURRENT, SET_SELECTED_PANEL_HOLD
} from "../constants/activity";

export const setAction = (value) => {
    return { type: SET_CURRENT,  value }
};

export const setSelectedPanelHold = (value) => {
    return { type: SET_SELECTED_PANEL_HOLD,  value }
};
