import { SET_TABLES, ADD_TABLE, DELETE_TABLE } from '../actionTypes'

const initialState = {
    tables: [],
    isLoading: true
}

export default function tableReducers(state = initialState, action) {

    switch (action.type) {

        case SET_TABLES:
            return {
                ...state,
                tables: action.payload,
                isLoading: false
            }
        case ADD_TABLE:
            return {
                ...state,
                tables: state.tables.concat(action.payload)
            }

        case DELETE_TABLE:
            return {
                ...state,
                tables: state.tables.filter((table) => table._id !== action.payload)
            }

        default:
            return state
    }

}