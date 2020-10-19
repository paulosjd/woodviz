import {
    SET_HOLD, SET_HOVER_HOLD, SET_SELECTED_HOLD, SET_SELECTED_HOLD_LIST, RESET_SELECTED_HOLD_LIST, DEL_HOLD,
    RESET_HOLDSET_AND_BOARD_ID
} from "../constants/board";

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

export const setSelectedHoldList = (value) => {
    return { type: SET_SELECTED_HOLD_LIST,  value }
};

export const resetSelectedHoldList = () => {
    return { type: RESET_SELECTED_HOLD_LIST }
};

export const resetHoldset = (value) => {
    return { type: RESET_HOLDSET_AND_BOARD_ID, value }
};