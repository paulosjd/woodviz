import {
    FETCH_SUMMARY_DATA_BEGIN, FETCH_SUMMARY_DATA_SUCCESS,
} from "../constants/profile";
import {xCoordsMap, yCoordsMap} from "../constants/board";

const initialState = {
    // loading: false,
    // error: null,
    // loadError: null,
    boards: [
        {holdSet: {}, xHoldsNum: '8', yHoldsNum: '12', boardName: 'Set A'},
    ]
};

export default function profile(state = initialState, action) {
    switch (action.type) {
        case 'sfddfds':
            return state
        default:
            return state
    }
}