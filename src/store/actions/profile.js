import axios from "axios";
import download from 'downloadjs';
import {
    FETCH_SUMMARY_DATA_BEGIN,
    FETCH_SUMMARY_DATA_SUCCESS,
    FETCH_SUMMARY_DATA_FAILURE,
    SHOW_PROFILE_MENU,
    PROFILE_MENU_EDIT_SUCCESS,
    PROFILE_MENU_FETCH_SUCCESS,
    PROFILE_MENU_FETCH_FAILURE,
    PROFILE_MENU_EDIT_FAILURE,
    CLEAR_PROFILE_UPDATE_STATUS,
    SHOW_INTERVENTIONS_MENU,
    SHOW_CSV_UPLOAD_MENU,
    SHOW_CSV_DOWNLOAD_MENU,
    SUBMIT_CSV_LOAD_SUCCESS,
    SUBMIT_CSV_LOAD_FAILURE,
    CSV_LOAD_CONFIRM,
    CSV_LOAD_CLEAR,
    CLEAR_CSV_LOAD_CONFIRM,
    UNIT_INFO_REFRESH,
    SHOW_MENU_EDIT_SUCCESS,
    POST_CUSTOM_PARAM_FAILURE,
    UPDATE_BOOKMARKS,
    SHOW_LINKED_PARAMS_MENU,
    UPDATE_LINKED_PARAMS,
    SHOW_PROFILE_SHARES_MENU,
    PROFILE_SHARE_FETCH_SUCCESS,
    SUMMARY_DATA_PROFILE_EXTRAS,
    SHOW_REPORT_DOWNLOAD_MENU,
    SET_HAS_REPORT_FILE
} from '../constants/profile'
import {SET_BOARD_POINTS, SET_BOARD_POINTS_FROM_NUMS} from '../constants/board'
import AuthService from "../../utils/auth_service";

const baseUrl = 'http://127.0.0.1:8000/api';

const Auth = new AuthService();

export const fetchProfileData = () => {
    let url = `${baseUrl}/profile/data`;
    return dispatch => {
        axios.get(url, {headers: {"Authorization": "Bearer " + localStorage.getItem('id_token')}})
            .then(profileData => {
                console.log('fetchProfileData profileData.data.data')
                console.log(profileData.data)
                dispatch({
                    type: SET_BOARD_POINTS,
                    value: {
                        xCoords: profileData.data.data.x_coords,
                        yCoords: profileData.data.data.y_coords,
                        holdSet: profileData.data.data.hold_set,
                    }
                });
            })
            .catch((error) => dispatch({ type: FETCH_SUMMARY_DATA_FAILURE, payload: {error} }))
    }
};

export const updateBoardPoints = (value, isAuth) => {
    console.log(value)
    console.log(isAuth)
    if (isAuth) {
        const url = `${baseUrl}/profile/board-setup`;
        return dispatch => {
            axios.post(url, {board_height: value.yNum, board_width: value.xNum},
                {headers: {"Authorization": "Bearer " + localStorage.getItem('id_token')}})
                .then(profileData => {
                    console.log('updateBoardPoints profileData.data.data')
                    console.log(profileData.data)
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

export const saveHoldSet = (value) => {
    const url = `${baseUrl}/profile/board-setup`;
    return dispatch => {
        axios.post(url,
            {hold_set: value.holdSet, board_width: value.boardWidth, board_height: value.boardHeight},
            {headers: {"Authorization": "Bearer " + localStorage.getItem('id_token')}})
            .then(profileData => {
                console.log('fetchProfileData profileData.data.data')
                console.log(profileData.data)
                dispatch({
                    type: SET_BOARD_POINTS,
                    value: {
                        xCoords: profileData.data.data.x_coords,
                        yCoords: profileData.data.data.y_coords,
                        holdSet: profileData.data.data.hold_set,
                    }
                });
            })
            // .then(() => setTimeout(() => dispatch({ type: CLEAR_PROFILE_UPDATE_STATUS }),2500))
            .catch((error) => dispatch({ type: FETCH_SUMMARY_DATA_FAILURE, payload: {error} }))
    }
};


// export const postColorSchema = (value) => {
//     return dispatch => {
//         axios.post(`${baseUrl}/profile/param-colors`, value,
//             {headers: {"Authorization": "Bearer " + localStorage.getItem('id_token')}})
//             .then((unitInfoData) => dispatch({ type: UNIT_INFO_REFRESH, payload: {unitInfoData}}) )
//             .then(() => dispatch({ type: SHOW_MENU_EDIT_SUCCESS }))
//             .then(() => setTimeout(() => dispatch({ type: CLEAR_PROFILE_UPDATE_STATUS }),2500))
//             .catch(() => dispatch({ type: PROFILE_MENU_EDIT_FAILURE }) )
//     }
// };
//
// export const postLinkedParamsEdit = (value) => {
//     return dispatch => {
//         axios.post(`${baseUrl}/profile/linked-param/edit`, value,
//             {headers: {"Authorization": "Bearer " + localStorage.getItem('id_token')}})
//             .then(payload => dispatch({ type: UPDATE_LINKED_PARAMS, payload: {payload} }))
//             .then(() => dispatch({ type: SHOW_MENU_EDIT_SUCCESS }))
//             .then(() => setTimeout(() => dispatch({ type: CLEAR_PROFILE_UPDATE_STATUS }),2500))
//             .catch(() => dispatch({ type: PROFILE_MENU_EDIT_FAILURE }) )
//     }
// };
