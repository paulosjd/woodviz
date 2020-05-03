import axios from "axios";
import {
    FETCH_SUMMARY_DATA_FAILURE,
} from '../constants/profile'
import {SET_BOARD_POINTS, SET_BOARD_POINTS_FROM_NUMS, SET_HOLD} from '../constants/board'
import {SHOW_HOLDS_SAVED_NOTE} from "../constants/activity";

const baseUrl = 'http://127.0.0.1:8000/api';

export const fetchProfileData = () => {
    let url = `${baseUrl}/profile/data`;
    return (dispatch, getState) => {
        const state = getState();
        const boardInd = state.activity.boardListIndex;
        axios.get(url, {headers: {"Authorization": "Bearer " + localStorage.getItem('id_token')}})
            .then(profileData => {
                const boards = profileData.data.data.boards;
                dispatch({
                    type: SET_BOARD_POINTS,
                    value: {
                        xCoords: boards[boardInd].x_coords,
                        yCoords: boards[boardInd].y_coords,
                        holdSet: boards[boardInd].hold_set,
                        boardName: boards[boardInd].board_name,
                    }
                });
            })
            .catch((error) => dispatch({ type: FETCH_SUMMARY_DATA_FAILURE, payload: {error} }))
    }
};

export const updateBoardPoints = (value, isAuth) => {
    if (isAuth) {
        const url = `${baseUrl}/profile/board-setup`;
        return dispatch => {
            axios.post(url, {board_height: value.yNum, board_width: value.xNum},
                {headers: {"Authorization": "Bearer " + localStorage.getItem('id_token')}})
                .then(profileData => {
                        dispatch({
                            type: SET_BOARD_POINTS,
                            value: {
                                xCoords: profileData.data.x_coords,
                                yCoords: profileData.data.y_coords,
                                holdSet: profileData.data.hold_set,
                            }
                        })
                    }
                )
                .catch((error) => dispatch({ type: FETCH_SUMMARY_DATA_FAILURE, payload: {error} }))
        }
    } else {
        return { type: SET_BOARD_POINTS_FROM_NUMS, value }
    }
};

// The above - only called from e.g. board_setup (not app didMount hook etc)
// - Should change this (and fetchProfileData) so that updates profile.boards  -  the current selected obj within array - []
// - then everywhere that

export const saveHoldSet = (value) => {
    const url = `${baseUrl}/profile/board-setup`;
    return dispatch => {
        axios.post(url,
            {hold_set: value.holdSet, board_width: value.boardWidth, board_height: value.boardHeight},
            {headers: {"Authorization": "Bearer " + localStorage.getItem('id_token')}})
            .then(() => dispatch({ type: SHOW_HOLDS_SAVED_NOTE, value: true }))
            .then(() => setTimeout(() => dispatch(
                { type: SHOW_HOLDS_SAVED_NOTE, value: false }),4000))
            .catch((error) => dispatch({ type: FETCH_SUMMARY_DATA_FAILURE, payload: {error} }))
    }
};

