import axios from "axios";
import {
    FETCH_SUMMARY_DATA_FAILURE, SET_PROFILE_BOARDS
} from '../constants/profile'
import {SET_BOARD_POINTS, SET_BOARD_POINTS_FROM_NUMS, SET_HOLD} from '../constants/board'
import {SHOW_HOLDS_SAVED_NOTE} from "../constants/activity";

const baseUrl = 'http://127.0.0.1:8000/api';

const pdcb = (profileData, dispatch, boardInd) => {
    const boards = profileData.data.boards;
    dispatch({
        type: SET_BOARD_POINTS,
        value: {
            xCoords: boards[boardInd].x_coords,
            yCoords: boards[boardInd].y_coords,
            holdSet: boards[boardInd].hold_set,
            boardName: boards[boardInd].board_name,
            boardId: boards[boardInd].board_id,
        }
    });
    dispatch({
        type: SET_PROFILE_BOARDS,
        value: boards.map(obj => {
            return { xCoords: obj.x_coords, yCoords: obj.y_coords, holdSet: obj.hold_set,
                boardName: obj.board_name, boardId: obj.board_id }
        })
    });
};

export const fetchProfileData = () => {
    let url = `${baseUrl}/profile/data`;
    return (dispatch, getState) => {
        const state = getState();
        const boardInd = state.activity.boardListIndex;
        axios.get(url, {headers: {"Authorization": "Bearer " + localStorage.getItem('id_token')}})
            .then(profileData => pdcb(profileData, dispatch, boardInd))
            .catch((error) => dispatch({ type: FETCH_SUMMARY_DATA_FAILURE, payload: {error} }))
    }
};

export const updateBoardPoints = (value, isAuth) => {
    if (isAuth) {
        const url = `${baseUrl}/profile/board-setup`;
        return (dispatch, getState) => {
            const state = getState();
            const boardInd = state.activity.boardListIndex;
            axios.post(url, {board_height: value.yNum, board_width: value.xNum, board_name: value.boardName},
                {headers: {"Authorization": "Bearer " + localStorage.getItem('id_token')}})
                .then(profileData => pdcb(profileData, dispatch, boardInd))
                .catch((error) => dispatch({ type: FETCH_SUMMARY_DATA_FAILURE, payload: {error} }))
        }
    } else {
        return { type: SET_BOARD_POINTS_FROM_NUMS, value }
    }
};

export const saveHoldSet = (value) => {
    const url = `${baseUrl}/profile/board-setup`;
    return dispatch => {
        axios.post(url,
            {hold_set: value.holdSet, board_width: value.boardWidth, board_height: value.boardHeight,
                board_name: value.boardName},
            {headers: {"Authorization": "Bearer " + localStorage.getItem('id_token')}})
            .then(() => dispatch({ type: SHOW_HOLDS_SAVED_NOTE, value: true }))
            .then(() => setTimeout(() => dispatch(
                { type: SHOW_HOLDS_SAVED_NOTE, value: false }),4000))
            .catch((error) => dispatch({ type: FETCH_SUMMARY_DATA_FAILURE, payload: {error} }))
    }
};

