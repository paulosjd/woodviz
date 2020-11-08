import axios from 'axios'
import { authConstants as constants } from '../constants/auth';
import { USER_LOGOUT, SET_AWAITING_AUTH} from "../constants/auth";
import {RESET_PROFILE_STATE} from "../constants/profile";
import {SET_BOARD_LIST_INDEX} from "../constants/activity";
import {RESET_BOARD_STATE} from "../constants/board";

const baseUrl = 'http://127.0.0.1:8000/api/users';

export const loginSuccess = (user) => {
    return { type: constants.LOGIN_SUCCESS, user }
};

export const regLoginSuccess = (user) => {
    return dispatch => {
        dispatch({ type: constants.LOGIN_SUCCESS, user });
        dispatch({ type: RESET_BOARD_STATE });
        dispatch({ type: RESET_PROFILE_STATE });
        dispatch(dispatch({ type: SET_BOARD_LIST_INDEX, value: 0 }));
    }
};

export const forgottenLogin = (field, email) => {
    const url = `${baseUrl}/help/${field}`;
    return dispatch => {
        axios.post(url, JSON.stringify({email}), {headers: {"Content-Type": "application/json", }})
            .then(() => dispatch({
                type: field === 'password' ? constants.PASSWORD_RESET_SUCCESS :
                    constants.USERNAME_REMINDER_SUCCESS
            }))
            .catch(errors => {});
    }
};

export const passwordResetConfirm = (body) => {
    const url = `${baseUrl}/password-reset`;
    return dispatch => {
        axios.post(url, JSON.stringify(body),{headers: {"Content-Type": "application/json"}})
            .then(() => dispatch({ type: constants.NEW_PASSWORD_CONFIRMED, value: 'Password has been reset' }))
            .catch(() => dispatch({ type: constants.NEW_PASSWORD_CONFIRMED, value: 'Reset link was invalid' }))
    }
};

export const userLogout = () => {
    return { type: USER_LOGOUT }
};

export const setAwaitingAuth = (value) => {
    return { type: SET_AWAITING_AUTH, value }
};

export const focusUsernameInput = (value) => {
    return { type: constants.FOCUS_USERNAME_INPUT, value }
};

export const setShowRegForm = (value) => {
    return { type: constants.SET_SHOW_REG_FORM, value  }
};

export const registrationSubmit = (data, loginFunc) => {
    const url = `${baseUrl}/registration`;
    return dispatch => {
        axios.post(url, JSON.stringify(data), {headers: {"Content-Type": "application/json", }})
            .then(value => loginFunc(value.data.token))
            .then(() => dispatch({ type: constants.SET_SHOW_REG_FORM, value: false }))
            .catch(errors => {
                if (errors.response && errors.response.status === 400) {
                    dispatch({ type: constants.SET_REGISTRATION_ERRORS, errors: errors.response.data.errors });
                } else {
                    dispatch({ type: constants.SET_REGISTRATION_ERRORS, errors: {miscError: 'Something went wrong'} })
                }
            });
    }
};
