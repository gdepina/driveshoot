import t from './actionTypes';
import { NET_INFO_CHANGED } from 'react-native-redux-listener';

let initialState = { isConnected: false, data: [], matches: [], currentMatch: null };

const matchReducer = (state = initialState, action) => {
    switch (action.type) {
        case NET_INFO_CHANGED:
            state = Object.assign({}, state, {isConnected: action.isConnected,});
            return state;

        case t.LOAD_MATCHES_SUCCESS:
            state = Object.assign({}, state, {matches: action.payload });
            return state;

        case t.LOAD_CURRENT_MATCH_SUCCESS:
            state = Object.assign({}, state, {currentMatch: action.payload });
            return state;

        case t.ADD_MATCH_SUCCESS:
            const currentMatch = action.payload in state.matches ? state.matches[action.payload]: null;
            state = Object.assign({}, state, { currentMatch });
            return state;


        default:
            return state;
    }
};


export default matchReducer;