import { RESET_BOARD_STATE, SET_BOARD_POINTS, SET_BOARD_POINTS_FROM_NUMS, SET_HOLD, SET_HOVER_HOLD, SET_SELECTED_HOLD,
    DEL_HOLD, xCoordsMap, yCoordsMap
} from '../constants/board'
import {SET_CURRENT} from '../constants/activity'

const initialState = {
    xCoords: xCoordsMap['8'],
    yCoords: yCoordsMap['12'],
    hoverHoldX: null,
    hoverHoldY: null,
    selectedHoldY: null,
    selectedHoldX: null,
    holdSet: {},
    boardName: '',
    boardId: '',
};

export default function board(state = initialState, action) {
    switch(action.type) {
        case RESET_BOARD_STATE:
            return { ...initialState };
        case SET_BOARD_POINTS_FROM_NUMS:
            return {
                ...state,
                holdSet: {},
                xCoords: xCoordsMap[action.value.xNum],
                yCoords: yCoordsMap[action.value.yNum],
                boardName: '',
                boardId: '', // TODO
            };
        case SET_BOARD_POINTS:
            return {
                ...state,
                holdSet: action.value.holdSet,
                xCoords: action.value.xCoords,
                yCoords: action.value.yCoords,
                boardName: action.value.boardName,
                boardId: action.value.boardId
            };
        case SET_HOLD:
            return {
                ...state,
                selectedHoldX: null,
                selectedHoldY: null,
                holdSet: {
                    ...state.holdSet,
                    [''.concat(state.selectedHoldX, state.selectedHoldY)]: action.value.svgDataInd
                }
            };
        case DEL_HOLD:
            let holdSet = {...state.holdSet};
            delete holdSet[''.concat(state.selectedHoldX, state.selectedHoldY)];
            return {
                ...state,
                selectedHoldX: null,
                selectedHoldY: null,
                holdSet: {...holdSet}
            };
        case SET_CURRENT:
            return { ...state, selectedHoldX: null, selectedHoldY: null };
        case SET_SELECTED_HOLD:
            return { ...state, ...action.value };
        case SET_HOVER_HOLD:
            return { ...state, ...action.value };
        default:
            return state
    }
}
