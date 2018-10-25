import actionType from './actionTypes';
import * as api from './api';

export function loadMatchs(key) {
    return dispatch => {
        dispatch({
            type: actionType.LOAD_MATCHES_REQUEST
        })
        api.getMatchsDB()
            .then(match => {
                dispatch({
                    type: actionType.LOAD_MATCHES_SUCCESS,
                    payload: match.val()
                })
                key && dispatch({
                    type: actionType.ADD_MATCH_SUCCESS,
                    payload: key,
                })
            })
            .catch(error => {
                dispatch({
                    type: actionType.LOAD_MATCHES_FAILED,
                    payload: error
                })
            })
    }
}

export function loadMatch(key) {
    return dispatch => {
        dispatch({
            type: actionType.LOAD_MATCHES_REQUEST
        })
        api.getMatchDB(key)
            .then(match => {
                dispatch({
                    type: actionType.LOAD_CURRENT_MATCH_SUCCESS,
                    payload: match.val()
                })
            })
            .catch(error => {
                dispatch({
                    type: actionType.LOAD_MATCHES_FAILED,
                    payload: error
                })
            })
    }
}


export function createMatch(name, orgId, matchSize, courtType, location, datetime, locationName, players) {
    return dispatch => {
        dispatch({
            type: actionType.ADD_MATCH_REQUEST
        })
       const result = api.addMatch(name, orgId, matchSize, courtType, location, datetime, locationName, players)
        result.prom
            .then(() => {
                loadMatchs(result.key)(dispatch) //refresh the data to keep up-to-date
            })
            .catch(error => {
                dispatch({
                    type: actionType.ADD_MATCH_FAILED,
                    payload: error
                })
            })
    }
}