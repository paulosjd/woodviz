import {
    FETCH_SUMMARY_DATA_BEGIN, FETCH_SUMMARY_DATA_SUCCESS,
} from "../constants/profile";

const initialState = {
    loading: false,
    error: null,
    loadError: null,
};

export default function profile(state = initialState, action) {
    switch (action.type) {
        case 'sfddfds':
            return state
        default:
            return state
    }
}