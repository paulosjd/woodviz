import axios from 'axios'
import AuthService from '../../utils/auth_service';
import { authConstants as constants } from '../constants/auth';
import { REGISTER_FAILURE, USER_LOGOUT, USER_EMAIL_UPDATE, SET_AWAITING_AUTH
} from "../constants/auth";

const baseUrl = 'http://127.0.0.1:8000/api/users';

export const loginSuccess = (user) => {
    return { type: constants.LOGIN_SUCCESS, user }
};

export const forgottenLogin = (field, email) => {
    const url = `${baseUrl}/help/${field}`;
    return dispatch => {
        axios.post(url, JSON.stringify({email}), {headers: {"Content-Type": "application/json", }})
            .then(() => {dispatch({type: field === 'password' ? constants.PASSWORD_RESET_SUCCESS :
                    constants.USERNAME_REMINDER_SUCCESS})
            })
    }
};

// TODO add usage back into component connected dispatch, from samson
export const requestVerificationEmail = () => {
    const url = `${baseUrl}/new-verification-email`;
    return dispatch => {
        axios.get(url, {headers: {"Authorization": "Bearer " + localStorage.getItem('id_token')}})
            .then(() => {dispatch({ type: constants.VERIFICATION_EMAIL_SUCCESS, value: true })})
            .then(() => setTimeout(() => dispatch(
                { type: constants.VERIFICATION_EMAIL_SUCCESS, value: false }),4000))
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

export const confirmAccountDelete = () => {
    const Auth = new AuthService();
    const url = `${baseUrl}/confirm-delete`;
    return (dispatch) => {
        axios.post(url, {confirm_delete: true},
            {headers: {"Authorization": "Bearer " + localStorage.getItem('id_token')}})
            .then(() => dispatch({ type: USER_LOGOUT })).then(() => Auth.logout())
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
            .catch(errors => {
                if (errors.response && errors.response.status === 400) {
                    dispatch({ type: REGISTER_FAILURE, errors: errors.response.data.errors });
                } else {
                    dispatch({ type: REGISTER_FAILURE, errors: {miscError: true} })
                }
            });
    }
};
