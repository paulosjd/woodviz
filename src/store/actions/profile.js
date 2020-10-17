import axios from "axios";
import {
    FETCH_SUMMARY_DATA_FAILURE, SET_PROFILE_BOARDS, INITIAL_LOAD_DONE
} from '../constants/profile'
import {SET_BOARD_POINTS, SET_BOARD_POINTS_FROM_NUMS, SET_HOLD} from '../constants/board'
import {
    SET_BOARD_LIST_INDEX,
    SET_SHOW_BOARD_ADD, SET_SHOW_BOARD_DELETE_CONFIRM,
    SET_SHOW_BOARD_NAME_EDIT,
    SHOW_HOLDS_SAVED_NOTE
} from "../constants/activity";

const baseUrl = 'http://127.0.0.1:8000/api';

const pdcb = (profileData, dispatch, boardInd, ) => {
    const boards = profileData.data.boards;
    dispatch({
        type: SET_BOARD_POINTS,
        value: {
            xCoords: boards[boardInd].x_coords,
            yCoords: boards[boardInd].y_coords,
            holdSet: boards[boardInd].hold_set,
            boardName: boards[boardInd].board_name,
            boardId: boards[boardInd].board_id,
            problems: boards[boardInd].problems,
            grades: boards[boardInd].grades
        }
    });
    dispatch({
        type: SET_PROFILE_BOARDS,
        value: boards.map(obj => boardObj(obj))
    })
};

const boardObj = (obj) => {
    return {
        xCoords: obj.x_coords, yCoords: obj.y_coords, holdSet: obj.hold_set,
        boardName: obj.board_name, boardId: obj.board_id,
        problems: obj.problems, grades: obj.grades
    }
};

export const syncBoardWithInd = () => {
    return (dispatch, getState) => {
        const state = getState();
        const boardInd = state.activity.boardListIndex;
        const boards = state.profile.boards;
        dispatch({
            type: SET_BOARD_POINTS,
            value: {
                xCoords: boards[boardInd].xCoords,
                yCoords: boards[boardInd].yCoords,
                holdSet: boards[boardInd].holdSet,
                boardName: boards[boardInd].boardName,
                boardId: boards[boardInd].boardId,
                problems: boards[boardInd].problems,
                grades: boards[boardInd].grades
            }
        });
    }
};

export const fetchProfileData = () => {
    let url = `${baseUrl}/profile/data`;
    return (dispatch, getState) => {
        const state = getState();
        const boardInd = state.activity.boardListIndex;
        axios.get(url, {headers: {"Authorization": "Bearer " + localStorage.getItem('id_token')}})
            .then(profileData => pdcb(profileData, dispatch, boardInd))
            .then(() => dispatch({ type: INITIAL_LOAD_DONE }))
            .catch((error) => dispatch({ type: FETCH_SUMMARY_DATA_FAILURE, payload: {error} }))
    }
};

export const updateBoardPoints = (value, isAuth) => {
    if (isAuth) {
        const url = `${baseUrl}/profile/board-setup`;
        return (dispatch, getState) => {
            const state = getState();
            const boardInd = state.activity.boardListIndex;
            axios.post(url, {board_height: value.yNum, board_width: value.xNum, board_name: value.boardName,
                    board_id: value.boardId},
                {headers: {"Authorization": "Bearer " + localStorage.getItem('id_token')}})
                .then(profileData => pdcb(profileData, dispatch, boardInd))
                .catch((error) => dispatch({ type: FETCH_SUMMARY_DATA_FAILURE, payload: {error} }))
        }
    } else {
        return { type: SET_BOARD_POINTS_FROM_NUMS, value }
    }
};

export const createNewBoard = (value) => {
    const url = `${baseUrl}/profile/board-setup`;
    return (dispatch, getState) => {
        const state = getState();
        axios.post(url, {board_height: state.board.yCoords.length, board_width: state.board.xCoords.length,
                board_name: value},
            {headers: {"Authorization": "Bearer " + localStorage.getItem('id_token')}})
            .then(profileData => dispatch({
                type: SET_PROFILE_BOARDS,
                value: profileData.data.boards.map(obj => boardObj(obj))
            }))
            .then(() => dispatch({ type: SET_SHOW_BOARD_ADD,  value: false }))
            .then(() => dispatch({ type: SET_BOARD_LIST_INDEX,  value: 0 }))
            .then(() => dispatch(syncBoardWithInd()))
            .catch((error) => dispatch({ type: FETCH_SUMMARY_DATA_FAILURE, payload: {error} }))
    }
};

export const editBoardName = (value, boardId) => {
    const url = `${baseUrl}/profile/board-setup`;
    return (dispatch) => {
        axios.post(url, {edit_name: true, board_name: value, board_id: boardId},
            {headers: {"Authorization": "Bearer " + localStorage.getItem('id_token')}})
            .then(profileData => dispatch({
                type: SET_PROFILE_BOARDS,
                value: profileData.data.boards.map(obj => boardObj(obj))
            }))
            .then(() => dispatch({ type: SET_SHOW_BOARD_NAME_EDIT, value: false }))
            .catch((error) => dispatch({ type: FETCH_SUMMARY_DATA_FAILURE, payload: {error} }))
    }
};

export const deleteBoard = (boardId) => {
    const url = `${baseUrl}/profile/board-setup`;
    return (dispatch) => {
        axios.post(url, {delete_board: true, board_id: boardId},
            {headers: {"Authorization": "Bearer " + localStorage.getItem('id_token')}})
            .then(profileData => dispatch({
                type: SET_PROFILE_BOARDS,
                value: profileData.data.boards.map(obj => boardObj(obj))
            }))
            .then(() => dispatch({ type: SET_SHOW_BOARD_DELETE_CONFIRM, value: false }))
            .then(() => dispatch({ type: SET_BOARD_LIST_INDEX,  value: 0 }))
            .then(() => dispatch(syncBoardWithInd()))
            .catch((error) => dispatch({ type: FETCH_SUMMARY_DATA_FAILURE, payload: {error} }))
    }
};

export const saveHoldSet = (value) => {
    const url = `${baseUrl}/profile/board-setup`;
    return dispatch => {
        axios.post(url,
            {hold_set: value.holdSet, board_width: value.boardWidth, board_height: value.boardHeight,
                board_name: value.boardName, board_id: value.boardId},
            {headers: {"Authorization": "Bearer " + localStorage.getItem('id_token')}})
            .then(profileData => dispatch({
                type: SET_PROFILE_BOARDS,
                value: profileData.data.boards.map(obj => boardObj(obj))
            }))
            .then(() => dispatch({ type: SHOW_HOLDS_SAVED_NOTE, value: true }))
            .then(() => setTimeout(() => dispatch(
                { type: SHOW_HOLDS_SAVED_NOTE, value: false }),4000))
            .catch((error) => dispatch({ type: FETCH_SUMMARY_DATA_FAILURE, payload: {error} }))
    }
};

export const saveProblemHolds = (value) => {
    console.log(value)
    const url = `${baseUrl}/profile/problems`;
    return dispatch => {
        axios.post(url,
            {name: value.name, grade: value.grade, board_id: value.boardId,
                x_holds: value.selectedHoldXList, y_holds: value.selectedHoldYList},
            {headers: {"Authorization": "Bearer " + localStorage.getItem('id_token')}})
            .then(profileData => dispatch({
                type: SET_PROFILE_BOARDS,
                value: profileData.data.boards.map(obj => boardObj(obj))
            }))                // dispatch({

                // type: 'fdgffg',
                // value: profileData.data.boards.map(obj => {
                //     return { xCoords: obj.x_coords, yCoords: obj.y_coords, holdSet: obj.hold_set,
                //         boardName: obj.board_name, boardId: obj.board_id }
                // })
            // }))
            // .then(() => dispatch({ type: SHOW_HOLDS_SAVED_NOTE, value: true }))
            // .then(() => setTimeout(() => dispatch(
            //     { type: SHOW_HOLDS_SAVED_NOTE, value: false }),4000))
            .catch((error) => console.log(error))
            //     dispatch({ type: FETCH_SUMMARY_DATA_FAILURE, payload: {error} }))

    }
};
