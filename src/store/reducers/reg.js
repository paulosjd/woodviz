import { authConstants } from '../constants/auth';

const initialState = {
    errors: '',
    passwordResetSent: false,
    usernameReminderSent: false,
    passwordReset: false,
    showRegForm: false,
    focusUsernameInput: false
};

export default function registration(state = initialState, action) {
    switch (action.type) {
        case authConstants.REGISTER_FAILURE:
            return { errors: action.errors };
        case authConstants.PASSWORD_RESET_SUCCESS:
            return { passwordResetSent: true };
        case authConstants.USERNAME_REMINDER_SUCCESS:
            return { usernameReminderSent: true };
        case authConstants.NEW_PASSWORD_CONFIRMED:
            return { passwordReset: action.value };
        case authConstants.FOCUS_USERNAME_INPUT:
            return { focusUsernameInput: action.value };
        case authConstants.SET_SHOW_REG_FORM:
            return { showRegForm: action.value };
        default:
            return state
    }
}
