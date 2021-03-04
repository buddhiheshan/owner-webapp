import { SET_USER, RESET_USER } from '../actionTypes'

const initialState = {
    firstname: '',
    lastname: '',
    token: null,
}

const userInfo = localStorage.getItem('token');

export default function userReducer(state = userInfo ? userInfo : initialState, action) {

    switch (action.type) {

        case SET_USER:
            return {
                ...state,
                token: action.payload.token, firstname: action.payload.firstname, lastname: action.payload.lastname
            };

        case RESET_USER:
            return {...initialState}

        default:
            return state;
    }

}