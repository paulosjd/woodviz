import { RESET_BOARD_STATE, SET_BOARD_POINTS, SET_BOARD_POINTS_FROM_NUMS, SET_HOLD, SET_HOVER_HOLD, SET_SELECTED_HOLD,
    SET_SELECTED_HOLD_LIST, RESET_SELECTED_HOLD_LIST, DEL_HOLD, xCoordsMap, yCoordsMap
} from '../constants/board'
import {SET_CURRENT, SET_BOARD_LIST_INDEX} from '../constants/activity'
import {holdAsStr, dimHoldAsStr} from '../../utils/helpers'

const initialState = {
    xCoords: xCoordsMap['8'],
    yCoords: yCoordsMap['12'],
    hoverHoldX: null,
    hoverHoldY: null,
    selectedHoldY: null,
    selectedHoldX: null,
    selectedHoldYList: [],
    selectedHoldXList: [],
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
                    [holdAsStr(state.selectedHoldX, state.selectedHoldY)]: action.value.svgDataInd
                }
            };
        case DEL_HOLD:
            let holdSet = {...state.holdSet};
            delete holdSet[holdAsStr(state.selectedHoldX, state.selectedHoldY)];
            return {
                ...state,
                selectedHoldX: null,
                selectedHoldY: null,
                holdSet: {...holdSet}
            };
        case SET_BOARD_LIST_INDEX:
            return { ...state, selectedHoldX: null, selectedHoldY: null, };
        case SET_CURRENT:
            return { ...state, selectedHoldX: null, selectedHoldY: null };
        case SET_SELECTED_HOLD:
            let value = action.value;
            console.log(value)
            if (value.selectedHoldX && value.selectedHoldX) {
                value.selectedHoldX = dimHoldAsStr(value.selectedHoldX)
                value.selectedHoldY = dimHoldAsStr(value.selectedHoldY)
            }
            console.log(value)
            return { ...state, ...value };
        case SET_SELECTED_HOLD_LIST:
            return { ...state, ...action.value };
        case SET_HOVER_HOLD:
            return { ...state, ...action.value };
        case RESET_SELECTED_HOLD_LIST:
            return { ...state, selectedHoldYList: [], selectedHoldXList: []};
        default:
            return state
    }
}
