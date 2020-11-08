import { authConstants } from '../constants/auth';

const initialState = {
    registrationErrors: '',
    passwordResetSent: false,
    usernameReminderSent: false,
    passwordReset: false,
    showRegForm: false,
    focusUsernameInput: false
};

export default function registration(state = initialState, action) {
    switch (action.type) {
        case authConstants.SET_REGISTRATION_ERRORS:
            return { ...state, registrationErrors: action.errors };
        case authConstants.PASSWORD_RESET_SUCCESS:
            return { ...state, passwordResetSent: true };
        case authConstants.USERNAME_REMINDER_SUCCESS:
            return { ...state, usernameReminderSent: true };
        case authConstants.NEW_PASSWORD_CONFIRMED:
            return { ...state, passwordReset: action.value };
        case authConstants.FOCUS_USERNAME_INPUT:
            return { ...state, focusUsernameInput: action.value };
        case authConstants.SET_SHOW_REG_FORM:
            return { ...state, showRegForm: action.value };
        case authConstants.REGISTER_FAILURE:
            return { ...state, registrationErrors: action.errors };
        default:
            return state
    }
}
